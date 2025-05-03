/**
 * Función para cargar un archivo markdown
 * @param path Ruta relativa al archivo markdown
 * @returns Contenido del archivo markdown
 */
export const loadMarkdownFile = async (path: string): Promise<string> => {
  console.log('Intentando cargar archivo desde:', path);
  try {
    // Asegurar que la ruta comienza con '/'
    let finalPath = path.startsWith('/') ? path : `/${path}`;
    
    // Verificar si estamos en producción y ajustar la ruta base si es necesario
    const baseUrl = import.meta.env.BASE_URL || '/';
    if (baseUrl !== '/' && !finalPath.startsWith(baseUrl)) {
      // Eliminar el '/' inicial si la base URL ya lo incluye
      finalPath = baseUrl.endsWith('/') 
        ? baseUrl + finalPath.substring(1) 
        : baseUrl + finalPath;
    }
    
    console.log('Ruta final:', finalPath);
    const response = await fetch(finalPath);
    
    if (!response.ok) {
      console.error('Error HTTP:', response.status, response.statusText);
      throw new Error(`Error al cargar el archivo (${response.status}): ${response.statusText}`);
    }
    
    const text = await response.text();
    console.log('Archivo cargado correctamente, tamaño:', text.length);
    return text;
  } catch (error) {
    console.error('Error cargando archivo markdown:', error);
    throw error;
  }
};

/**
 * Función para obtener la lista de archivos markdown disponibles
 * @returns Un objeto con las categorías y sus archivos disponibles
 */
export const getAvailableMarkdownFiles = () => {
  // Asegurar que las rutas de los archivos son correctas según la base URL
  const baseUrl = import.meta.env.BASE_URL || '/';
  const createPath = (path: string) => {
    // Si la ruta ya comienza con la base URL, no la modificamos
    if (path.startsWith(baseUrl)) return path;
    
    // Eliminar el '/' inicial si la base URL ya lo incluye
    return baseUrl.endsWith('/') 
      ? baseUrl + path.replace(/^\//, '') 
      : baseUrl + path;
  };

  return {
    regular: [
      { id: 'present_regular', name: 'Presente Regular', path: createPath('/data/regular/present_regular.md') },
      { id: 'past_regular', name: 'Pasado Regular', path: createPath('/data/regular/past_regular.md') },
      { id: 'future_regular', name: 'Futuro Regular', path: createPath('/data/regular/future_regular.md') }
    ],
    irregular: [
      { id: 'present_irregular', name: 'Presente Irregular', path: createPath('/data/irregular/present_irregular.md') },
      { id: 'past_irregular', name: 'Pasado Irregular', path: createPath('/data/irregular/past_irregular.md') },
      { id: 'future_irregular', name: 'Futuro Irregular', path: createPath('/data/irregular/future_irregular.md') }
    ]
  };
}; 