import { useState } from 'react';
import regularVerbs from '../data/json/regular_verbs.json';
import irregularVerbs from '../data/json/irregular_verbs.json';
import { useTheme } from '../hooks/useTheme';

export const VerbsListPage = () => {
  const [verbType, setVerbType] = useState<'regular' | 'irregular'>('regular');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  // Determinar qué lista de verbos mostrar
  const verbs = verbType === 'regular' 
    ? regularVerbs.regular_verbs 
    : irregularVerbs.irregular_verbs;

  // Filtrar verbos según el término de búsqueda
  const filteredVerbs = verbs.filter(verb => 
    verb.infinitive.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verb.translation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`container mx-auto px-4 py-6 sm:py-8 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        {verbType === 'regular' ? 'Verbos Regulares' : 'Verbos Irregulares'}
      </h1>
      
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

      <div className={`overflow-x-auto ${theme === 'dark' 
        ? 'shadow-[5px_5px_15px_#1e1e1e,-5px_-5px_15px_#4a4a4a]' 
        : 'shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff]'} rounded-xl`}>
        <div className={`min-w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`grid grid-cols-3 sm:grid-cols-5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} font-bold text-sm sm:text-base`}>
            <div className="p-3 sm:p-4 border-b">Infinitivo</div>
            <div className="p-3 sm:p-4 border-b hidden sm:block">Pasado Simple</div>
            <div className="p-3 sm:p-4 border-b">Participio Pasado</div>
            <div className="p-3 sm:p-4 border-b hidden sm:block">Gerundio</div>
            <div className="p-3 sm:p-4 border-b">Traducción</div>
          </div>
          
          <div className="divide-y">
            {filteredVerbs.length > 0 ? (
              filteredVerbs.map((verb, index) => (
                <div key={index} className={`grid grid-cols-3 sm:grid-cols-5 ${theme === 'dark' 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-50'} text-sm sm:text-base`}>
                  <div className="p-3 sm:p-4 font-medium">{verb.infinitive}</div>
                  <div className="p-3 sm:p-4 hidden sm:block">{verb.past_simple}</div>
                  <div className="p-3 sm:p-4">{verb.past_participle}</div>
                  <div className="p-3 sm:p-4 hidden sm:block">{verb.gerund}</div>
                  <div className="p-3 sm:p-4">{verb.translation}</div>
                </div>
              ))
            ) : (
              <div className={`p-4 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                No se encontraron verbos con ese criterio de búsqueda.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vista detallada para móviles */}
      <div className="sm:hidden mt-6">
        <h2 className="text-lg font-semibold mb-3">Detalles completos</h2>
        {filteredVerbs.length > 0 ? (
          <div className="space-y-4">
            {filteredVerbs.map((verb, index) => (
              <div key={`mobile-${index}`} className={`p-4 rounded-xl ${theme === 'dark' 
                ? 'bg-gray-800 shadow-[5px_5px_10px_#1e1e1e,-5px_-5px_10px_#4a4a4a]' 
                : 'bg-white shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]'}`}>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-semibold">Infinitivo:</div>
                  <div>{verb.infinitive}</div>
                  
                  <div className="font-semibold">Pasado Simple:</div>
                  <div>{verb.past_simple}</div>
                  
                  <div className="font-semibold">Participio Pasado:</div>
                  <div>{verb.past_participle}</div>
                  
                  <div className="font-semibold">Gerundio:</div>
                  <div>{verb.gerund}</div>
                  
                  <div className="font-semibold">Traducción:</div>
                  <div>{verb.translation}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`p-4 text-center rounded-xl ${theme === 'dark' 
            ? 'bg-gray-800 text-gray-400 shadow-[5px_5px_10px_#1e1e1e,-5px_-5px_10px_#4a4a4a]' 
            : 'bg-white text-gray-500 shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]'}`}>
            No se encontraron verbos con ese criterio de búsqueda.
          </div>
        )}
      </div>
    </div>
  );
};

export default VerbsListPage; 