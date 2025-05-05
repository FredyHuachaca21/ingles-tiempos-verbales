import { useRef, useLayoutEffect, useCallback, useState, useEffect } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';
import 'markmap-toolbar/dist/style.css';
import { useTheme, THEME_CHANGE_EVENT } from '../../hooks/useTheme';

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
  const { theme } = useTheme();
  const [forceUpdate, setForceUpdate] = useState(0);
  
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
  
  // Escuchar evento personalizado de cambio de tema
  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{theme: string}>;
      console.log('MarkmapViewer detectó cambio de tema:', customEvent.detail.theme);
      
      // Forzar una actualización del componente
      setForceUpdate(prev => prev + 1);
      
      // Actualizar clases y estilos del SVG
      if (refSvg.current) {
        if (customEvent.detail.theme === 'dark') {
          refSvg.current.classList.add('dark-theme-markmap');
        } else {
          refSvg.current.classList.remove('dark-theme-markmap');
        }
      }
      
      // Actualizar la barra de herramientas si existe
      if (toolbarRef.current) {
        if (customEvent.detail.theme === 'dark') {
          toolbarRef.current.classList.add('dark');
        } else {
          toolbarRef.current.classList.remove('dark');
        }
      }
    };
    
    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
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

  // Aplicar estilo para el modo oscuro al SVG directamente
  useEffect(() => {
    if (!refSvg.current) return;

    // Cuando el tema cambia, actualizar las clases del SVG
    if (theme === 'dark') {
      refSvg.current.classList.add('dark-theme-markmap');
    } else {
      refSvg.current.classList.remove('dark-theme-markmap');
    }

    // Aplicar estilos CSS personalizados para el modo oscuro
    const styleEl = document.getElementById('markmap-theme-styles');
    if (!styleEl) {
      const newStyle = document.createElement('style');
      newStyle.id = 'markmap-theme-styles';
      newStyle.textContent = `
        /* Estilos para modo claro */
        .markmap-node {
          fill: #333333 !important;
          font-size: 16px !important;
          font-weight: 500 !important;
        }
        .markmap-node-circle {
          stroke: #0284c7 !important;
          stroke-width: 1.5px !important;
          fill: white !important;
        }
        .markmap-link {
          stroke: #0284c7 !important;
          stroke-width: 1.5px !important;
        }
        
        /* Estilos para modo oscuro */
        .dark-theme-markmap .markmap-node {
          fill: #ffffff !important;
          font-size: 16px !important;
          font-weight: 500 !important;
        }
        .dark-theme-markmap .markmap-node-circle {
          stroke: #38bdf8 !important;
          stroke-width: 1.5px !important;
          fill: #1e293b !important;
        }
        .dark-theme-markmap .markmap-link {
          stroke: #38bdf8 !important;
          stroke-width: 1.5px !important;
        }
        
        /* Estilos para toolbar */
        .mm-toolbar {
          background-color: #f3f4f6 !important;
          border-color: #e5e7eb !important;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1) !important;
        }
        .mm-toolbar-item {
          color: #374151 !important;
        }
        .mm-toolbar-item:hover {
          background-color: #e5e7eb !important;
        }
        
        /* Toolbar en modo oscuro */
        .dark .mm-toolbar {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3) !important;
        }
        .dark .mm-toolbar-item {
          color: #e5e7eb !important;
        }
        .dark .mm-toolbar-item:hover {
          background-color: #4b5563 !important;
        }
      `;
      document.head.appendChild(newStyle);
    }
  }, [theme, forceUpdate]);
  
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
        const parentHeight = isFullscreen ? window.innerHeight : 480; // Reducir altura cuando no está en fullscreen
        
        // Forzar dimensiones explícitas para evitar NaN
        svg.style.width = '100%';
        svg.style.height = isFullscreen ? '100vh' : '480px'; // Altura ajustada
        
        // Establecer atributos dimensionales
        svg.setAttribute('width', `${parentWidth}px`);
        svg.setAttribute('height', `${parentHeight}px`);
        svg.setAttribute('viewBox', `0 0 ${parentWidth} ${parentHeight}`);
        
        // Aplicar clase de tema oscuro si es necesario
        if (theme === 'dark') {
          svg.classList.add('dark-theme-markmap');
        } else {
          svg.classList.remove('dark-theme-markmap');
        }
        
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
              state.zoom = 1.2; // Zoom inicial seguro
              state.x = parentWidth / 2;
              state.y = parentHeight / 2 + 30;
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
              el.style.zIndex = '5'; // Reducir z-index para que no tape otros elementos
              
              // Aplicar clase para el modo oscuro
              if (theme === 'dark') {
                el.classList.add('dark');
              } else {
                el.classList.remove('dark');
              }
              
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
  }, [markdown, mapKey, cleanupMarkmap, toggleFullscreen, isFullscreen, theme, forceUpdate]);
  
  return (
    <div 
      ref={refContainer} 
      className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : 'relative w-full h-[480px]'}`}
      style={{ 
        zIndex: isFullscreen ? 40 : 'auto',
        position: isFullscreen ? 'fixed' : 'relative'
      }}
    >
      <svg 
        ref={refSvg} 
        className={`w-full rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
        width="100%" 
        height={isFullscreen ? '100vh' : '480px'}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
        style={{ 
          height: isFullscreen ? '100vh' : '480px',
          position: 'relative'
        }}
      ></svg>
    </div>
  );
};