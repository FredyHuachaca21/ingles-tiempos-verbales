import { useState, useEffect, useCallback, useMemo } from 'react';
import { loadMarkdownFile, getAvailableMarkdownFiles } from '../services/markdownService';
import { MarkmapViewer } from './Markmap';
import { DocumentTextIcon, BookOpenIcon, ClockIcon } from '@heroicons/react/24/outline';
import '../styles/MarkmapSelector.css';

const VERB_CATEGORIES = ['regular', 'irregular'];
const TENSE_FILES = {
  regular: ['present_regular', 'past_regular', 'future_regular'],
  irregular: ['present_irregular', 'past_irregular', 'future_irregular']
};

type Category = 'regular' | 'irregular';

export const MarkmapSelector = () => {
  const [category, setCategory] = useState<Category>('regular');
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [mapKey, setMapKey] = useState<number>(0);
  
  // Obtenemos los archivos disponibles
  const files = useMemo(() => getAvailableMarkdownFiles(), []);
  
  // Cargar archivo de markdown
  const loadFileContent = useCallback(async (fileId: string, cat: Category) => {
    if (!fileId) return;
    
    const fileObj = files[cat].find(f => f.id === fileId);
    if (!fileObj) return;
    
    try {
      setLoading(true);
      console.log('Cargando archivo:', fileObj.path);
      const content = await loadMarkdownFile(fileObj.path);
      console.log('Contenido cargado, longitud:', content.length);
      setMarkdownContent(content);
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      setMarkdownContent('# Error al cargar el contenido');
    } finally {
      setLoading(false);
    }
  }, [files]);
  
  // Inicialización: seleccionar el primer archivo de la categoría inicial
  useEffect(() => {
    if (files[category]?.length > 0 && !selectedFile) {
      const defaultFile = files[category][0].id;
      console.log('Inicialización: seleccionando archivo inicial', defaultFile);
      setSelectedFile(defaultFile);
      loadFileContent(defaultFile, category);
    }
  }, [files, category, selectedFile, loadFileContent]);
  
  // Manejar cambio de categoría
  const handleCategoryChange = useCallback((newCategory: Category) => {
    if (newCategory === category) return;
    
    console.log('Cambiando categoría a:', newCategory);
    
    // Seleccionar el primer archivo de la nueva categoría
    const newFile = files[newCategory][0].id;
    
    // Actualizar estados y forzar recreación del mapa
    setMapKey(prev => prev + 1);
    setCategory(newCategory);
    setSelectedFile(newFile);
    
    // Cargar el contenido del nuevo archivo
    loadFileContent(newFile, newCategory);
  }, [category, files, loadFileContent]);
  
  // Manejar cambio de archivo
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFile = e.target.value;
    if (newFile === selectedFile) return;
    
    console.log('Cambiando archivo a:', newFile);
    setSelectedFile(newFile);
    loadFileContent(newFile, category);
  }, [selectedFile, category, loadFileContent]);
  
  // Obtener el título del archivo actual
  const getCurrentTitle = () => {
    if (!selectedFile) return '';
    const fileObj = files[category].find(f => f.id === selectedFile);
    return fileObj ? fileObj.name : '';
  };
  
  return (
    <div className="markmap-container">
      <div className="selector-container">
        <div className="category-selector">
          {Object.keys(files).map((cat) => (
            <button
              key={cat}
              className={`category-button ${cat === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat as Category)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="file-selector">
          <select 
            value={selectedFile} 
            onChange={handleFileChange}
            disabled={loading}
          >
            {files[category]?.map((file) => (
              <option key={file.id} value={file.id}>
                {file.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="markmap-viewer">
        {loading ? (
          <div className="loading">Cargando mapa mental...</div>
        ) : (
          <div key={`markmap-wrapper-${mapKey}`} className="markmap-wrapper">
            <MarkmapViewer 
              markdown={markdownContent} 
              mapKey={mapKey}
            />
          </div>
        )}
      </div>
    </div>
  );
}; 