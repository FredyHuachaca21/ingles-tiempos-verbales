import { useState, useEffect } from 'react';
import { MarkmapViewer } from './Markmap';
import { loadMarkdownFile, getAvailableMarkdownFiles } from '../services/markdownService';

export const MarkmapSelector = () => {
  const [selectedCategory, setSelectedCategory] = useState<'regular' | 'irregular'>('regular');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const files = getAvailableMarkdownFiles();
  
  // Cargar el primer archivo por defecto al montar el componente
  useEffect(() => {
    if (files[selectedCategory].length > 0 && !selectedFile) {
      console.log('Seleccionando archivo por defecto:', files[selectedCategory][0].id);
      setSelectedFile(files[selectedCategory][0].id);
    }
  }, [selectedCategory, files, selectedFile]);
  
  // Cargar el contenido del archivo cuando cambia la selección
  useEffect(() => {
    // Evitar cargar si no hay archivo seleccionado
    if (!selectedFile) return;
    
    const fileObj = files[selectedCategory].find(f => f.id === selectedFile);
    if (!fileObj) return;
    
    console.log('Cargando archivo:', fileObj.path);
    setLoading(true);
    setError(null);
    
    // Función para cargar el archivo
    const fetchData = async () => {
      try {
        const content = await loadMarkdownFile(fileObj.path);
        console.log('Contenido cargado, longitud:', content.length);
        setMarkdown(content);
      } catch (err) {
        console.error('Error cargando archivo:', err);
        setError(`Error al cargar el archivo: ${err instanceof Error ? err.message : String(err)}`);
        setMarkdown('');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedFile, selectedCategory, files]);
  
  // Manejadores de cambio
  const handleCategoryChange = (category: 'regular' | 'irregular') => {
    if (category === selectedCategory) return;
    console.log('Cambiando categoría a:', category);
    setSelectedCategory(category);
    setSelectedFile(null); // Resetear la selección de archivo
  };
  
  return (
    <div className="markmap-selector">
      <div className="selector-controls">
        <div className="category-selector">
          <label>Categoría:</label>
          <div className="button-group">
            <button 
              className={selectedCategory === 'regular' ? 'active' : ''} 
              onClick={() => handleCategoryChange('regular')}
              disabled={loading}
            >
              Verbos Regulares
            </button>
            <button 
              className={selectedCategory === 'irregular' ? 'active' : ''} 
              onClick={() => handleCategoryChange('irregular')}
              disabled={loading}
            >
              Verbos Irregulares
            </button>
          </div>
        </div>
        
        <div className="file-selector">
          <label>Tiempo Verbal:</label>
          <div className="button-group">
            {files[selectedCategory].map(file => (
              <button 
                key={file.id}
                className={selectedFile === file.id ? 'active' : ''}
                onClick={() => setSelectedFile(file.id)}
                disabled={loading || selectedFile === file.id}
              >
                {file.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="markmap-content">
        {loading && <div className="loading">Cargando mapa mental...</div>}
        {error && <div className="error">{error}</div>}
        {!loading && !error && markdown && (
          <div className="markmap-container">
            <MarkmapViewer markdown={markdown} />
          </div>
        )}
      </div>
    </div>
  );
}; 