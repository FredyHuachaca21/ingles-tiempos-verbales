import { useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';
import 'markmap-toolbar/dist/style.css';

interface MarkmapProps {
  markdown: string;
}

// Creamos un transformer fuera del componente para evitar recreaciones
const transformer = new Transformer();

export const MarkmapViewer = ({ markdown }: MarkmapProps) => {
  const refSvg = useRef<SVGSVGElement>(null);
  const refToolbar = useRef<HTMLDivElement>(null);
  const markmapRef = useRef<Markmap | null>(null);
  
  // Función de limpieza memoizada
  const cleanupMarkmap = useCallback(() => {
    if (refToolbar.current) refToolbar.current.innerHTML = '';
    if (refSvg.current) refSvg.current.innerHTML = '';
    markmapRef.current = null;
  }, []);
  
  // Usamos useLayoutEffect para asegurar que las medidas se tomen antes de renderizar
  useLayoutEffect(() => {
    if (!refSvg.current || !markdown) {
      return cleanupMarkmap;
    }
    
    // Limpiar cualquier contenido previo
    cleanupMarkmap();
    
    // Retrasar ligeramente la creación para asegurar que el DOM esté listo
    const timerId = setTimeout(() => {
      try {
        console.log('Creando mapa mental con markdown:', markdown.substring(0, 50) + '...');
        
        // Establecer dimensiones fijas para evitar problemas de NaN
        const svg = refSvg.current;
        if (!svg) return;
        
        const width = svg.clientWidth || 800;
        const height = svg.clientHeight || 600;
        
        svg.setAttribute('width', width.toString());
        svg.setAttribute('height', height.toString());
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        
        // Transformar markdown
        const { root } = transformer.transform(markdown);
        
        // Crear nueva instancia con opciones seguras
        const mm = Markmap.create(svg, {
          autoFit: true,
          initialExpandLevel: 1, // Reducir nivel inicial de expansión
          duration: 0, // Sin animación para el renderizado inicial
          maxWidth: width * 0.8,
        }, root);
        
        markmapRef.current = mm;
        
        // Verificar si podemos ajustar el mapa después de que esté renderizado
        if (mm && typeof mm.fit === 'function') {
          // Asegurar que el fit se realice cuando el DOM esté estable
          requestAnimationFrame(() => {
            if (mm.state) {
              try {
                mm.fit();
              } catch (e) {
                console.warn('Error al ajustar el mapa:', e);
              }
            }
          });
        }
        
        // Agregar la barra de herramientas
        if (refToolbar.current) {
          try {
            const toolbar = new Toolbar();
            toolbar.attach(mm);
            refToolbar.current.appendChild(toolbar.render());
            console.log('Mapa mental creado correctamente');
          } catch (e) {
            console.warn('Error al crear la barra de herramientas:', e);
          }
        }
      } catch (error) {
        console.error('Error al inicializar markmap:', error);
        cleanupMarkmap();
      }
    }, 50); // Pequeño retraso para asegurar que el DOM esté listo
    
    // Función de limpieza para el efecto
    return () => {
      clearTimeout(timerId);
      cleanupMarkmap();
    };
  }, [markdown, cleanupMarkmap]); // Incluir cleanupMarkmap en las dependencias
  
  return (
    <>
      <div ref={refToolbar} className="markmap-toolbar"></div>
      <svg 
        ref={refSvg} 
        className="markmap" 
        style={{ 
          display: 'block',
          margin: '0 auto',
          width: '100%',
          height: '600px',
          maxWidth: '100%',
          background: '#fff'
        }}
      ></svg>
    </>
  );
}; 