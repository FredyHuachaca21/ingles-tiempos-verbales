import { useState, useEffect } from 'react';
import { VerbConjugationTable } from '../components/verbs/VerbConjugationTable';
import regularVerbs from '../data/json/regular_verbs.json';
import irregularVerbs from '../data/json/irregular_verbs.json';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

type Verb = {
  infinitive: string;
  past_simple: string;
  past_participle: string;
  gerund: string;
  translation: string;
};

export const VerbConjugationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null);
  const [allVerbs, setAllVerbs] = useState<Verb[]>([]);
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Estilos neumórficos
  const neuCardStyle = {
    backgroundColor: theme === 'light' ? '#f0f0f3' : '#2a2a2e',
    boxShadow: theme === 'light' 
      ? '10px 10px 20px rgba(174, 174, 192, 0.4), -10px -10px 20px rgba(255, 255, 255, 0.8)' 
      : '10px 10px 20px rgba(0, 0, 0, 0.4), -10px -10px 20px rgba(65, 65, 77, 0.2)',
    transition: 'all 0.3s ease'
  };

  const neuButtonStyle = {
    backgroundColor: theme === 'light' ? '#f0f0f3' : '#2a2a2e',
    boxShadow: theme === 'light' 
      ? '5px 5px 10px rgba(174, 174, 192, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.8)' 
      : '5px 5px 10px rgba(0, 0, 0, 0.4), -5px -5px 10px rgba(65, 65, 77, 0.2)',
    transition: 'all 0.2s ease'
  };

  const neuInputStyle = {
    backgroundColor: theme === 'light' ? '#f5f5f7' : '#333',
    boxShadow: theme === 'light' 
      ? 'inset 3px 3px 6px rgba(174, 174, 192, 0.2), inset -3px -3px 6px rgba(255, 255, 255, 0.7)' 
      : 'inset 3px 3px 6px rgba(0, 0, 0, 0.3), inset -3px -3px 6px rgba(65, 65, 77, 0.2)',
  };

  // Combinar todos los verbos al iniciar
  useEffect(() => {
    const combined = [
      ...regularVerbs.regular_verbs,
      ...irregularVerbs.irregular_verbs
    ];
    setAllVerbs(combined);

    // Seleccionar un verbo aleatorio al cargar
    if (combined.length > 0) {
      const randomIndex = Math.floor(Math.random() * combined.length);
      setSelectedVerb(combined[randomIndex]);
    }
  }, []);

  // Filtrar verbos según el término de búsqueda
  const filteredVerbs = searchTerm.trim() === '' 
    ? [] 
    : allVerbs.filter(verb => 
        verb.infinitive.toLowerCase().includes(searchTerm.toLowerCase()) ||
        verb.translation.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 8); // Limitar resultados para no sobrecargar la UI

  const handleSelectVerb = (verb: Verb) => {
    setSelectedVerb(verb);
    setSearchTerm('');
  };

  // Función para seleccionar un verbo aleatorio
  const handleRandomVerb = () => {
    const randomIndex = Math.floor(Math.random() * allVerbs.length);
    setSelectedVerb(allVerbs[randomIndex]);
    setSearchTerm('');
  };

  return (
    <div className={`container mx-auto px-4 py-6 sm:py-8 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/verbs')}
          className={`px-4 py-2 rounded-full transition-all duration-300 text-sm sm:text-base ${
            theme === 'light' 
              ? 'text-gray-700 hover:text-gray-900' 
              : 'text-gray-300 hover:text-white'
          }`}
          style={neuButtonStyle}
        >
          ← Volver
        </button>
        
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
          Conjugación de Verbos
        </h1>
        
        <div className="w-10"></div> {/* Spacer para centrar el título */}
      </div>
      
      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <div className="rounded-xl p-2" style={neuCardStyle}>
            <input
              type="text"
              placeholder="Buscar un verbo en inglés o español..."
              className={`w-full px-4 py-3 rounded-lg border-none focus:outline-none ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-100'
              }`}
              style={neuInputStyle}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {filteredVerbs.length > 0 && (
            <div className={`absolute z-10 w-full mt-3 rounded-xl overflow-hidden ${
              theme === 'light' ? 'bg-white/80 backdrop-blur-md border' : 'bg-gray-800/80 backdrop-blur-md border border-gray-700'
            } shadow-lg max-h-60 overflow-y-auto`}>
              {filteredVerbs.map((verb, index) => (
                <div 
                  key={index}
                  className={`px-4 py-3 cursor-pointer flex justify-between ${
                    theme === 'light' 
                      ? 'hover:bg-blue-50' 
                      : 'hover:bg-gray-700'
                  }`}
                  onClick={() => handleSelectVerb(verb)}
                >
                  <span className="font-medium">{verb.infinitive}</span>
                  <span className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
                    {verb.translation}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-center">
          <button
            className={`px-5 py-3 rounded-xl transition-all duration-300 ${
              theme === 'light' 
                ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                : 'bg-blue-900/20 text-blue-300 hover:bg-blue-900/30'
            }`}
            style={neuButtonStyle}
            onClick={handleRandomVerb}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Verbo Aleatorio
            </span>
          </button>
        </div>
      </div>
      
      <div 
        className={`rounded-xl p-6 ${
          theme === 'light' 
            ? 'bg-white' 
            : 'bg-gray-800'
        } overflow-hidden`}
        style={neuCardStyle}
      >
        {selectedVerb ? (
          <VerbConjugationTable verb={selectedVerb} />
        ) : (
          <div className={`text-center py-12 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            Busca un verbo para ver su conjugación
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          Conoce la conjugación de los verbos más comunes en inglés. Total disponibles: <span className="font-medium">{allVerbs.length}</span>
        </p>
      </div>
    </div>
  );
};

export default VerbConjugationPage; 