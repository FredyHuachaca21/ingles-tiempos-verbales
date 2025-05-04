import { useRef, useLayoutEffect, useCallback, useState } from 'react';
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
  const refToolbar = useRef<HTMLDivElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  const markmapRef = useRef<Markmap | null>(null);
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
    if (refToolbar.current) refToolbar.current.innerHTML = '';
    if (refSvg.current) refSvg.current.innerHTML = '';
    markmapRef.current = null;
  }, []);
  
  // Crear y configurar el mapa mental
  useLayoutEffect(() => {
    if (!refSvg.current || !markdown) {
      return cleanupMarkmap;
    }
    
    // Limpiar cualquier contenido previo
    cleanupMarkmap();
    
    try {
      console.log('Creando mapa mental con markdown:', markdown.substring(0, 50) + '...');
      
      // Establecer dimensiones fijas para evitar problemas de NaN
      const svg = refSvg.current;
      
      // Configurar dimensiones y viewBox explícitos antes de crear el mapa
      const width = svg.clientWidth || 800;
      const height = svg.clientHeight || 600;
      
      svg.setAttribute('width', `${width}px`);
      svg.setAttribute('height', `${height}px`);
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      
      // Transformar markdown
      const { root } = transformer.transform(markdown);
      
      // Crear nueva instancia con opciones seguras
      const mm = Markmap.create(svg, {
        autoFit: true,
        initialExpandLevel: 2,
      }, root);
      
      markmapRef.current = mm;
      
      // Agregar la barra de herramientas según la documentación oficial
      if (refContainer.current && mm) {
        // Usar el método estático create que es el recomendado en la documentación
        const { el } = Toolbar.create(mm);
        
        // Posicionar la barra de herramientas en la parte inferior derecha
        el.style.position = 'absolute';
        el.style.bottom = '0.5rem';
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
        
        console.log('Mapa mental y barra de herramientas creados correctamente');
      }
    } catch (error) {
      console.error('Error al inicializar markmap:', error);
    }
    
    // Función de limpieza para el efecto
    return cleanupMarkmap;
  }, [markdown, mapKey, cleanupMarkmap, toggleFullscreen]);
  
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