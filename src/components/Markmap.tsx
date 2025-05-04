import { useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';
import 'markmap-toolbar/dist/style.css';

interface MarkmapProps {
  markdown: string;
  mapKey?: number; // Clave opcional para forzar rerenderizado
}

// Creamos un transformer fuera del componente para evitar recreaciones
const transformer = new Transformer();

export const MarkmapViewer = ({ markdown, mapKey = 0 }: MarkmapProps) => {
  const refSvg = useRef<SVGSVGElement>(null);
  const refToolbar = useRef<HTMLDivElement>(null);
  const markmapRef = useRef<Markmap | null>(null);
  const timerRef = useRef<number | null>(null);
  
  // Función de limpieza memoizada
  const cleanupMarkmap = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    if (refToolbar.current) refToolbar.current.innerHTML = '';
    if (refSvg.current) refSvg.current.innerHTML = '';
    
    // Liberar referencias
    markmapRef.current = null;
  }, []);
  
  // Usamos useLayoutEffect para asegurar que las medidas se tomen antes de renderizar
  useLayoutEffect(() => {
    // Limpiar cualquier instancia previa
    cleanupMarkmap();
    
    if (!refSvg.current || !markdown) {
      return cleanupMarkmap;
    }
    
    // Retrasar ligeramente la creación para asegurar que el DOM esté listo
    timerRef.current = window.setTimeout(() => {
      try {
        console.log('Creando mapa mental con markdown:', markdown.substring(0, 50) + '...');
        
        // Asegurar que el SVG esté limpio
        const svg = refSvg.current;
        if (!svg) return;
        
        // Limpiar cualquier contenido previo
        svg.innerHTML = '';
        
        // Establecer dimensiones seguras
        const width = 800;
        const height = 600;
        
        svg.setAttribute('width', width.toString());
        svg.setAttribute('height', height.toString());
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        
        // Transformar markdown con manejo de errores
        let rootData;
        try {
          const { root } = transformer.transform(markdown);
          rootData = root;
        } catch (e) {
          console.error('Error transformando markdown:', e);
          return;
        }
        
        // Crear nueva instancia con opciones seguras
        const mm = Markmap.create(svg, {
          autoFit: false, // Desactivamos autofit inicial
          initialExpandLevel: 1,
          duration: 0, // Sin animación para el renderizado inicial
          maxWidth: width * 0.8,
        }, rootData);
        
        markmapRef.current = mm;
        
        // Dar tiempo al DOM para estabilizarse antes de hacer zoom
        window.setTimeout(() => {
          if (!mm) return;
          
          // Establecer una posición inicial segura
          if (mm.state) {
            // Usar asignación con casting para evitar errores de tipo
            const state = mm.state as any;
            state.zoom = 1;
            state.x = width / 2;
            state.y = height / 2;
          }
          
          // Intentar ajustar solo después de que el estado es seguro
          try {
            mm.fit(); // Ajustar después de establecer estado seguro
          } catch (e) {
            console.warn('Error al ajustar el mapa (ignorable):', e);
          }
        }, 100);
        
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
    return cleanupMarkmap;
  }, [markdown, mapKey, cleanupMarkmap]); // Incluir mapKey en las dependencias
  
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