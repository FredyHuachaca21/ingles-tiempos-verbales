/**
 * Función para cargar un archivo markdown
 * @param path Ruta relativa al archivo markdown
 * @returns Contenido del archivo markdown
 */
export const loadMarkdownFile = async (path: string): Promise<string> => {
  console.log('Intentando cargar archivo desde:', path);
  try {
    // Asegurar que la ruta comienza con '/'
    const finalPath = path.startsWith('/') ? path : `/${path}`;
    
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
  return {
    regular: [
      { id: 'present_regular', name: 'Presente Regular', path: '/data/regular/present_regular.md' },
      { id: 'past_regular', name: 'Pasado Regular', path: '/data/regular/past_regular.md' },
      { id: 'future_regular', name: 'Futuro Regular', path: '/data/regular/future_regular.md' }
    ],
    irregular: [
      { id: 'present_irregular', name: 'Presente Irregular', path: '/data/irregular/present_irregular.md' },
      { id: 'past_irregular', name: 'Pasado Irregular', path: '/data/irregular/past_irregular.md' },
      { id: 'future_irregular', name: 'Futuro Irregular', path: '/data/irregular/future_irregular.md' }
    ]
  };
}; 