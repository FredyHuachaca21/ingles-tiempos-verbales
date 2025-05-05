import { useState, useMemo, useEffect } from 'react';
import regularVerbs from '../data/json/regular_verbs.json';
import irregularVerbs from '../data/json/irregular_verbs.json';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

export const VerbsListPage = () => {
  const [verbType, setVerbType] = useState<'regular' | 'irregular'>('regular');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLetterIndex, setActiveLetterIndex] = useState<string | null>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Estilos neumórficos optimizados para mejor cambio de tema
  const neuButtonStyle = useMemo(() => ({
    backgroundColor: theme === 'light' ? '#f0f0f3' : '#2a2a2e',
    boxShadow: theme === 'light' 
      ? '5px 5px 10px rgba(174, 174, 192, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.8)' 
      : '5px 5px 10px rgba(0, 0, 0, 0.6), -5px -5px 10px rgba(75, 75, 90, 0.3)',
    transition: 'all 0.2s ease'
  }), [theme]);

  // Determinar qué lista de verbos mostrar
  const verbs = verbType === 'regular' 
    ? regularVerbs.regular_verbs 
    : irregularVerbs.irregular_verbs;

  // Filtrar verbos según el término de búsqueda
  const filteredVerbs = verbs.filter(verb => 
    verb.infinitive.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verb.translation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generar letras disponibles en los verbos filtrados
  const availableLetters = useMemo(() => {
    if (searchTerm !== '') return [];
    
    const letters: string[] = [];
    verbs.forEach(verb => {
      const firstLetter = verb.infinitive.charAt(0).toUpperCase();
      if (!letters.includes(firstLetter)) {
        letters.push(firstLetter);
      }
    });
    return letters.sort();
  }, [verbs, searchTerm]);

  // Agrupar verbos por letra inicial
  const groupedVerbs = useMemo(() => {
    const grouped: { [key: string]: typeof verbs } = {};
    
    filteredVerbs.forEach(verb => {
      const firstLetter = verb.infinitive.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(verb);
    });
    
    return grouped;
  }, [filteredVerbs]);

  // Función simple para desplazarse a una letra
  const scrollToLetter = (letter: string) => {
    setActiveLetterIndex(letter);
    
    // Intentar primero con el ID para móvil, luego para escritorio
    const mobileElement = document.getElementById(`mobile-letter-${letter}`);
    const desktopElement = document.getElementById(`desktop-letter-${letter}`);
    
    // Determinar qué elemento usar
    const targetElement = window.innerWidth < 640 ? mobileElement : desktopElement;
    
    if (targetElement) {
      // Scroll con pequeño retraso para asegurar que funcione
      setTimeout(() => {
        // Posición con offset para que no quede bajo el header
        const yOffset = -80;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }, 10);
    }
  };
  
  // Asegurar que el índice alfabético funcione bien en todos los dispositivos
  useEffect(() => {
    // Resetear el activeLetterIndex cuando cambia el tipo de verbo
    setActiveLetterIndex(null);
  }, [verbType]);

  return (
    <div className={`container mx-auto px-4 py-6 sm:py-8 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/verbs')}
          className={`px-4 py-2 rounded-full transition-all duration-300 text-sm sm:text-base font-medium flex items-center ${
            theme === 'light' 
              ? 'text-gray-700 hover:text-gray-900' 
              : 'text-gray-200 hover:text-white'
          }`}
          style={neuButtonStyle}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver
        </button>
        
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
          {verbType === 'regular' ? 'Verbos Regulares' : 'Verbos Irregulares'}
        </h1>
        
        <div className="w-10"></div> {/* Spacer para centrar el título */}
      </div>
      
      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 w-full sm:w-auto">
          <button
            className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm sm:text-base
              ${verbType === 'regular' 
                ? `${theme === 'dark' 
                    ? 'bg-gray-700 text-blue-300 shadow-[inset_3px_3px_6px_#1e1e1e,inset_-3px_-3px_6px_#4a4a4a]' 
                    : 'bg-blue-50 text-blue-600 shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff]'}`
                : `${theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 shadow-[5px_5px_10px_#1e1e1e,-5px_-5px_10px_#4a4a4a]'
                    : 'bg-gray-100 text-gray-700 shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]'}`
              }`}
            onClick={() => setVerbType('regular')}
          >
            Verbos Regulares
          </button>
          <button
            className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm sm:text-base
              ${verbType === 'irregular' 
                ? `${theme === 'dark' 
                    ? 'bg-gray-700 text-blue-300 shadow-[inset_3px_3px_6px_#1e1e1e,inset_-3px_-3px_6px_#4a4a4a]' 
                    : 'bg-blue-50 text-blue-600 shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff]'}`
                : `${theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 shadow-[5px_5px_10px_#1e1e1e,-5px_-5px_10px_#4a4a4a]'
                    : 'bg-gray-100 text-gray-700 shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]'}`
              }`}
            onClick={() => setVerbType('irregular')}
          >
            Verbos Irregulares
          </button>
        </div>
        
        <div className="w-full sm:w-64">
          <div className={`relative ${theme === 'dark' 
            ? 'shadow-[5px_5px_10px_#1e1e1e,-5px_-5px_10px_#4a4a4a]' 
            : 'shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]'} rounded-xl p-1`}>
            <input
              type="text"
              placeholder="Buscar verbo..."
              className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' 
                ? 'bg-gray-800 text-gray-200 focus:outline-none' 
                : 'bg-gray-50 text-gray-800 focus:outline-none'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Contenedor principal con índice alfabético */}
      <div className="relative flex flex-col mt-4">
        {/* Contenedor para contenido principal y barra lateral */}
        <div className="relative flex">
          {/* Contenido principal */}
          <div className="flex-grow pr-5 sm:pr-10">
            {/* Vista para escritorio (tablet y mayor) */}
            <div className={`overflow-x-auto hidden sm:block ${theme === 'dark' 
              ? 'shadow-[5px_5px_15px_#121212,-5px_-5px_15px_#3a3a3a]' 
              : 'shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff]'} rounded-xl`}>
              <div className={`min-w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`grid grid-cols-5 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100'} font-bold text-sm sm:text-base`}>
                  <div className="p-3 sm:p-4 border-b">Infinitivo</div>
                  <div className="p-3 sm:p-4 border-b">Pasado Simple</div>
                  <div className="p-3 sm:p-4 border-b">Participio Pasado</div>
                  <div className="p-3 sm:p-4 border-b">Gerundio</div>
                  <div className="p-3 sm:p-4 border-b">Traducción</div>
                </div>
                
                <div className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {searchTerm === '' && Object.keys(groupedVerbs).sort().map(letter => (
                    <div key={letter}>
                      <div id={`desktop-letter-${letter}`} className={`p-2 text-center font-bold ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
                        {letter}
                      </div>
                      
                      {groupedVerbs[letter].map((verb, index) => (
                        <div key={index} className={`grid grid-cols-5 ${theme === 'dark' 
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-50'} text-sm sm:text-base`}>
                          <div className="p-3 sm:p-4 font-medium">{verb.infinitive}</div>
                          <div className="p-3 sm:p-4">{verb.past_simple}</div>
                          <div className="p-3 sm:p-4">{verb.past_participle}</div>
                          <div className="p-3 sm:p-4">{verb.gerund}</div>
                          <div className="p-3 sm:p-4">{verb.translation}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                  
                  {(searchTerm !== '' ? filteredVerbs : []).length > 0 ? (
                    filteredVerbs.map((verb, index) => (
                      <div key={index} className={`grid grid-cols-5 ${theme === 'dark' 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-50'} text-sm sm:text-base`}>
                        <div className="p-3 sm:p-4 font-medium">{verb.infinitive}</div>
                        <div className="p-3 sm:p-4">{verb.past_simple}</div>
                        <div className="p-3 sm:p-4">{verb.past_participle}</div>
                        <div className="p-3 sm:p-4">{verb.gerund}</div>
                        <div className="p-3 sm:p-4">{verb.translation}</div>
                      </div>
                    ))
                  ) : (
                    searchTerm !== '' && (
                      <div className={`p-4 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        No se encontraron verbos con ese criterio de búsqueda.
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Vista con tarjetas para móviles */}
            <div className="sm:hidden">
              <h2 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Lista de Verbos</h2>
              
              {/* Incluir identificadores de letras para facilitar la navegación en móviles */}
              {searchTerm === '' && Object.keys(groupedVerbs).sort().map(letter => (
                <div key={letter} className="mb-6 relative pr-10"> {/* Añadir padding right para evitar sobreposición */}
                  {/* Marcador simple para cada letra */}
                  <div id={`mobile-letter-${letter}`} className={`p-2 text-center font-bold rounded-lg mb-2 z-10 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-800 shadow'
                  }`}>
                    {letter}
                  </div>
                  
                  <div className="space-y-4">
                    {groupedVerbs[letter].map((verb, index) => (
                      <div 
                        key={`mobile-${letter}-${index}`} 
                        className={`p-4 rounded-xl ${theme === 'dark' 
                          ? 'bg-gray-800 shadow-[3px_3px_8px_#121212,-3px_-3px_8px_#3a3a3a]' 
                          : 'bg-white shadow-[3px_3px_8px_#d1d9e6,-3px_-3px_8px_#ffffff]'}`}
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <div className={`font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>Infinitivo:</div>
                          <div className="font-medium">{verb.infinitive}</div>
                          
                          <div className={`font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>Pasado Simple:</div>
                          <div>{verb.past_simple}</div>
                          
                          <div className={`font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>Participio Pasado:</div>
                          <div>{verb.past_participle}</div>
                          
                          <div className={`font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>Gerundio:</div>
                          <div>{verb.gerund}</div>
                          
                          <div className={`font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>Traducción:</div>
                          <div>{verb.translation}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {searchTerm !== '' && filteredVerbs.length > 0 ? (
                <div className="space-y-4">
                  {filteredVerbs.map((verb, index) => (
                    <div key={`mobile-search-${index}`} className={`p-4 rounded-xl ${theme === 'dark' 
                      ? 'bg-gray-800 shadow-[5px_5px_10px_#121212,-5px_-5px_10px_#3a3a3a]' 
                      : 'bg-white shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]'}`}>
                      <div className="grid grid-cols-2 gap-2">
                        <div className={`font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>Infinitivo:</div>
                        <div>{verb.infinitive}</div>
                        
                        <div className={`font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>Pasado Simple:</div>
                        <div>{verb.past_simple}</div>
                        
                        <div className={`font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>Participio Pasado:</div>
                        <div>{verb.past_participle}</div>
                        
                        <div className={`font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>Gerundio:</div>
                        <div>{verb.gerund}</div>
                        
                        <div className={`font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>Traducción:</div>
                        <div>{verb.translation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                searchTerm !== '' && (
                  <div className={`p-4 text-center rounded-xl ${theme === 'dark' 
                    ? 'bg-gray-800 text-gray-400 shadow-[5px_5px_10px_#1a1a1a,-5px_-5px_10px_#3c3c3c]' 
                    : 'bg-white text-gray-500 shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]'}`}>
                    No se encontraron verbos con ese criterio de búsqueda.
                  </div>
                )
              )}
            </div>
          </div>
          
          {/* Índice alfabético vertical - visible en todos los dispositivos */}
          {searchTerm === '' && availableLetters.length > 0 && (
            <div className="fixed right-0 md:right-1 top-1/2 transform -translate-y-1/2 z-50">
              <div 
                className={`flex flex-col items-center justify-center p-1 rounded-l-lg ${
                  theme === 'dark' 
                    ? 'bg-gray-800/85 backdrop-blur-sm shadow-md border-t border-l border-b border-gray-700' 
                    : 'bg-white/85 backdrop-blur-sm shadow-md border-t border-l border-b border-gray-200'
                } scrollbar-hide`}
                style={{ 
                  maxHeight: '65vh', 
                  overflowY: 'auto',
                  paddingRight: '2px'
                }}
              >
                {availableLetters.map(letter => (
                  <div
                    key={letter}
                    onClick={() => {
                      // Al hacer clic, aplicar inmediatamente cambio de estilo para feedback instantáneo
                      setActiveLetterIndex(letter);
                      
                      // Luego realizar el scroll
                      setTimeout(() => scrollToLetter(letter), 10);
                    }}
                    className={`w-7 h-7 sm:w-7 sm:h-7 flex items-center justify-center text-xs sm:text-sm rounded-md my-0.5 cursor-pointer ${
                      activeLetterIndex === letter
                        ? theme === 'light'
                          ? 'bg-blue-500 text-white font-bold shadow-sm'
                          : 'bg-blue-600 text-white font-bold shadow-sm'
                        : theme === 'light'
                          ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100 active:bg-gray-200'
                          : 'text-gray-300 hover:text-blue-300 hover:bg-gray-700 active:bg-gray-600'
                    }`}
                    style={{
                      transition: 'all 0.1s ease',
                      boxShadow: activeLetterIndex === letter ? '0 0 4px rgba(59, 130, 246, 0.5)' : 'none',
                      WebkitTapHighlightColor: 'transparent',
                      userSelect: 'none'
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerbsListPage; 