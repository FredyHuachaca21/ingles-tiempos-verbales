import { useState, useEffect, useCallback, useMemo } from 'react';
import { loadMarkdownFile, getAvailableMarkdownFiles } from '../../services/markdownService';
import { MarkmapViewer } from './MarkmapViewer';
import { useTheme } from '../../hooks/useTheme';

type Category = 'regular' | 'irregular';

export const MarkmapSelector = () => {
  const [category, setCategory] = useState<Category>('regular');
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [mapKey, setMapKey] = useState<number>(0);
  const { theme } = useTheme();
  
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
  
  return (
    <div className="flex flex-col w-full h-full space-y-4 pb-10">
      <div 
        className={`p-4 rounded-xl transition-all duration-300 ${
          theme === 'light' ? 'bg-white' : 'bg-gray-800'
        }`}
        style={{
          boxShadow: theme === 'light' 
            ? '5px 5px 10px rgba(0,0,0,0.05), -5px -5px 10px rgba(255,255,255,0.8)' 
            : '5px 5px 10px rgba(0,0,0,0.1)'
        }}
      >
        <div className="flex flex-wrap gap-4 mb-4">
          {Object.keys(files).map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full text-base font-medium transition-all duration-300 ${
                cat === category 
                  ? (theme === 'light' 
                    ? 'bg-gray-100 text-gray-800 shadow-inner' 
                    : 'bg-gray-700 text-white shadow-inner')
                  : (theme === 'light'
                    ? 'bg-white text-gray-700 hover:text-gray-900'
                    : 'bg-gray-800 text-gray-300 hover:text-white')
              }`}
              style={{
                boxShadow: cat === category
                  ? (theme === 'light'
                    ? 'inset 3px 3px 6px rgba(0,0,0,0.1), inset -3px -3px 6px rgba(255,255,255,0.7)'
                    : 'inset 3px 3px 6px rgba(0,0,0,0.2)')
                  : (theme === 'light'
                    ? '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)'
                    : '3px 3px 6px rgba(0,0,0,0.2)')
              }}
              onClick={() => handleCategoryChange(cat as Category)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="w-full">
          <select 
            value={selectedFile} 
            onChange={handleFileChange}
            disabled={loading}
            className={`w-full p-3 rounded-xl focus:outline-none transition-all duration-300 ${
              theme === 'light'
                ? 'bg-gray-50 text-gray-800 border-gray-200'
                : 'bg-gray-700 text-gray-200 border-gray-600'
            }`}
            style={{
              boxShadow: theme === 'light'
                ? 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.7)'
                : 'inset 2px 2px 5px rgba(0,0,0,0.2)'
            }}
          >
            {files[category]?.map((file) => (
              <option key={file.id} value={file.id}>
                {file.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div 
        className={`relative rounded-xl overflow-hidden grow ${
          theme === 'light' ? 'bg-white' : 'bg-gray-800'
        }`}
        style={{
          boxShadow: theme === 'light' 
            ? '5px 5px 10px rgba(0,0,0,0.05), -5px -5px 10px rgba(255,255,255,0.8)' 
            : '5px 5px 10px rgba(0,0,0,0.1)',
          minHeight: '70vh',
          height: 'calc(100vh - 250px)',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '2rem'
        }}
      >
        {loading ? (
          <div className={`flex items-center justify-center h-full min-h-[480px] ${
            theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
          }`}>
            <div className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
              <svg className="animate-spin h-10 w-10 mr-3 inline" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
                style={{ color: theme === 'light' ? '#2196f3' : '#64b5f6' }}
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-lg">Cargando mapa mental...</span>
            </div>
          </div>
        ) : (
          <div key={`markmap-wrapper-${mapKey}`} className="w-full h-full flex-grow" style={{ height: '100%' }}>
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