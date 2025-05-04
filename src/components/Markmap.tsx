import { useRef, useLayoutEffect, useCallback, useState, useEffect } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';
import 'markmap-toolbar/dist/style.css';

interface MarkmapProps {
  markdown: string;
  mapKey?: number;
}

// Creamos un transformer fuera del componente para evitar recreaciones
const transformer = new Transformer();

export const MarkmapViewer = ({ markdown, mapKey = 0 }: MarkmapProps) => {
  const refSvg = useRef<SVGSVGElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  const markmapRef = useRef<Markmap | null>(null);
  const toolbarRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Función para alternar el modo de pantalla completa
  const toggleFullscreen = useCallback(() => {
    if (!refContainer.current) return;
    
    if (!document.fullscreenElement) {
      // Entrar en modo pantalla completa
      refContainer.current.requestFullscreen().catch(err => {
        console.error(`Error al intentar modo pantalla completa: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      // Salir del modo pantalla completa
      document.exitFullscreen().catch(err => {
        console.error(`Error al salir de pantalla completa: ${err.message}`);
      });
      setIsFullscreen(false);
    }
    
    // Esperar un momento para que la interfaz se actualice y luego ajustar el mapa
    setTimeout(() => {
      if (markmapRef.current) {
        try {
          markmapRef.current.fit();
        } catch (e) {
          console.warn('Error al ajustar el mapa:', e);
        }
      }
    }, 300);
  }, []);
  
  // Manejar cambios en el estado de pantalla completa
  useLayoutEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Función de limpieza memoizada
  const cleanupMarkmap = useCallback(() => {
    // Limpiar cualquier temporizador pendiente
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Eliminar la barra de herramientas existente si hay alguna
    if (toolbarRef.current && toolbarRef.current.parentNode) {
      toolbarRef.current.parentNode.removeChild(toolbarRef.current);
      toolbarRef.current = null;
    }
    
    // Limpiar el SVG
    if (refSvg.current) {
      refSvg.current.innerHTML = '';
    }
    
    markmapRef.current = null;
  }, []);
  
  // Limpiar todos los recursos al desmontar
  useEffect(() => {
    return () => {
      cleanupMarkmap();
    };
  }, [cleanupMarkmap]);
  
  // Crear y configurar el mapa mental
  useLayoutEffect(() => {
    if (!refSvg.current || !markdown || !refContainer.current) {
      return cleanupMarkmap;
    }
    
    // Limpiar cualquier contenido previo
    cleanupMarkmap();
    
    // Usamos un retraso para asegurar que el DOM se ha renderizado completamente
    timeoutRef.current = setTimeout(() => {
      try {
        console.log('Creando mapa mental con markdown:', markdown.substring(0, 50) + '...');
        
        // Establecer dimensiones fijas para evitar problemas de NaN
        const svg = refSvg.current;
        if (!svg) return;
        
        // Asegurarnos de que el SVG tenga dimensiones explícitas y consistentes
        const parentWidth = svg.parentElement?.clientWidth || 800;
        const parentHeight = svg.parentElement?.clientHeight || 600;
        
        // Forzar dimensiones explícitas para evitar NaN
        svg.style.width = '100%';
        svg.style.height = isFullscreen ? '100vh' : '600px';
        
        // Establecer atributos dimensionales
        svg.setAttribute('width', `${parentWidth}px`);
        svg.setAttribute('height', `${parentHeight}px`);
        svg.setAttribute('viewBox', `0 0 ${parentWidth} ${parentHeight}`);
        
        // Esperar a que las dimensiones se apliquen
        requestAnimationFrame(() => {
          try {
            // Transformar markdown
            const { root } = transformer.transform(markdown);
            
            // Crear nueva instancia con opciones seguras
            const mm = Markmap.create(svg, {
              autoFit: false, // Inicialmente desactivado para configurar un estado inicial seguro
              initialExpandLevel: 2,
              duration: 0, // Sin animaciones iniciales
              maxWidth: parentWidth * 0.8,
            }, root);
            
            // Configurar un estado inicial seguro para evitar NaN
            if (mm.state) {
              const state = mm.state as any;
              state.zoom = 1; // Zoom inicial seguro
              state.x = parentWidth / 2;
              state.y = parentHeight / 2;
            }
            
            markmapRef.current = mm;
            
            // Agregar la barra de herramientas según la documentación oficial
            if (refContainer.current && mm) {
              // Remover cualquier toolbar existente primero
              document.querySelectorAll('.mm-toolbar').forEach(el => {
                if (el.parentNode) {
                  el.parentNode.removeChild(el);
                }
              });
              
              // Usar el método estático create que es el recomendado en la documentación
              const { el } = Toolbar.create(mm);
              toolbarRef.current = el;
              
              // Posicionar la barra de herramientas en la parte superior derecha
              el.style.position = 'absolute';
              el.style.top = '0.5rem';
              el.style.right = '0.5rem';
              el.style.zIndex = '100';
              
              // Añadir botón de pantalla completa personalizado
              const fullscreenBtn = document.createElement('div');
              fullscreenBtn.className = 'mm-toolbar-item';
              fullscreenBtn.title = 'Pantalla completa';
              fullscreenBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path stroke="none" fill="currentColor" fill-rule="evenodd" d="M4 9v-4h4v2h-2v2zM4 11v4h4v-2h-2v-2zM16 9v-4h-4v2h2v2zM16 11v4h-4v-2h2v-2z"></path>
                </svg>
              `;
              fullscreenBtn.addEventListener('click', toggleFullscreen);
              
              // Añadir el botón a la barra de herramientas
              el.appendChild(fullscreenBtn);
              
              // Añadir la barra de herramientas al contenedor
              refContainer.current.appendChild(el);
              
              // Ajustar el mapa después de un pequeño retraso para asegurar que está listo
              setTimeout(() => {
                try {
                  mm.fit(); // Ahora sí ajustamos automáticamente
                } catch (e) {
                  console.warn('Error al ajustar el mapa (ignorable):', e);
                }
              }, 100);
              
              console.log('Mapa mental y barra de herramientas creados correctamente');
            }
          } catch (error) {
            console.error('Error interno al inicializar markmap:', error);
          }
        });
      } catch (error) {
        console.error('Error al inicializar markmap:', error);
      }
    }, 50); // Pequeño retraso inicial
    
    // Función de limpieza para el efecto
    return cleanupMarkmap;
  }, [markdown, mapKey, cleanupMarkmap, toggleFullscreen, isFullscreen]);
  
  return (
    <div 
      ref={refContainer} 
      className={`markmap-wrapper ${isFullscreen ? 'fullscreen' : ''}`}
      style={{ position: 'relative' }}
    >
      <svg 
        ref={refSvg} 
        className="markmap" 
        width="100%" 
        height={isFullscreen ? '100vh' : '600px'}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
        style={{ 
          width: '100%',
          height: isFullscreen ? '100vh' : '600px',
          maxWidth: '100%',
          background: '#fff'
        }}
      ></svg>
    </div>
  );
};