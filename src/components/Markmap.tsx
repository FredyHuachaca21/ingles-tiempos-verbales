import { useEffect, useRef } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';
import 'markmap-toolbar/dist/style.css';

interface MarkmapProps {
  markdown: string;
}

// Creamos un transformer compartido fuera del componente
const transformer = new Transformer();

export const MarkmapViewer = ({ markdown }: MarkmapProps) => {
  const refSvg = useRef<SVGSVGElement>(null);
  const refToolbar = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Verificar que tenemos markdown y un elemento SVG
    if (!refSvg.current || !markdown) {
      console.log('No hay SVG o markdown');
      return;
    }
    
    console.log('Creando mapa mental con markdown:', markdown.substring(0, 50) + '...');
    
    // Limpiar contenedores
    if (refToolbar.current) refToolbar.current.innerHTML = '';
    if (refSvg.current) refSvg.current.innerHTML = '';
    
    try {
      // Transformar markdown a formato markmap
      const { root } = transformer.transform(markdown);
      
      // Crear la instancia de markmap
      const mm = Markmap.create(refSvg.current, {
        autoFit: true,
        initialExpandLevel: 2,
        duration: 500,
      }, root);
      
      console.log('Mapa mental creado correctamente');
      
      // Añadir la barra de herramientas
      if (refToolbar.current) {
        const toolbar = new Toolbar();
        toolbar.attach(mm);
        refToolbar.current.appendChild(toolbar.render());
      }
    } catch (error) {
      console.error('Error creando el mapa mental:', error);
    }
    
    // Limpieza al desmontar
    return () => {
      if (refToolbar.current) refToolbar.current.innerHTML = '';
      if (refSvg.current) refSvg.current.innerHTML = '';
    };
  }, [markdown]); // Solo depende del markdown
  
  return (
    <>
      <div ref={refToolbar} className="markmap-toolbar"></div>
      <svg 
        ref={refSvg} 
        className="markmap" 
        width="800" 
        height="600"
        viewBox="0 0 800 600"
        style={{ 
          display: 'block',
          margin: '0 auto',
          maxWidth: '100%'
        }}
      ></svg>
    </>
  );
}; 