import { useState, useEffect } from 'react';
import { VerbConjugationTable } from '../components/verbs/VerbConjugationTable';
import regularVerbs from '../data/json/regular_verbs.json';
import irregularVerbs from '../data/json/irregular_verbs.json';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Conjugación de Verbos en Inglés
      </h1>
      
      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar un verbo en inglés o español..."
            className="w-full px-4 py-3 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {filteredVerbs.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredVerbs.map((verb, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                  onClick={() => handleSelectVerb(verb)}
                >
                  <span className="font-medium">{verb.infinitive}</span>
                  <span className="text-gray-500">{verb.translation}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
            onClick={handleRandomVerb}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Verbo Aleatorio
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg p-6">
        {selectedVerb ? (
          <VerbConjugationTable verb={selectedVerb} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            Busca un verbo para ver su conjugación
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center text-gray-600">
        <p>Conoce la conjugación de los verbos más comunes en inglés</p>
        <p>Total de verbos disponibles: {allVerbs.length}</p>
      </div>
    </div>
  );
};

export default VerbConjugationPage; 