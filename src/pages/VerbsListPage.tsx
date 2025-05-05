import { useState } from 'react';
import regularVerbs from '../data/json/regular_verbs.json';
import irregularVerbs from '../data/json/irregular_verbs.json';

export const VerbsListPage = () => {
  const [verbType, setVerbType] = useState<'regular' | 'irregular'>('regular');
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {verbType === 'regular' ? 'Verbos Regulares' : 'Verbos Irregulares'}
      </h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <button
            className={`px-4 py-2 rounded ${verbType === 'regular' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setVerbType('regular')}
          >
            Verbos Regulares
          </button>
          <button
            className={`px-4 py-2 rounded ${verbType === 'irregular' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setVerbType('irregular')}
          >
            Verbos Irregulares
          </button>
        </div>
        
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Buscar verbo..."
            className="w-full px-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <div className="grid grid-cols-5 bg-gray-100 font-bold">
          <div className="p-3 border-b">Infinitivo</div>
          <div className="p-3 border-b">Pasado Simple</div>
          <div className="p-3 border-b">Participio Pasado</div>
          <div className="p-3 border-b">Gerundio</div>
          <div className="p-3 border-b">Traducción</div>
        </div>
        
        <div className="divide-y">
          {filteredVerbs.length > 0 ? (
            filteredVerbs.map((verb, index) => (
              <div key={index} className="grid grid-cols-5 hover:bg-gray-50">
                <div className="p-3 font-medium">{verb.infinitive}</div>
                <div className="p-3">{verb.past_simple}</div>
                <div className="p-3">{verb.past_participle}</div>
                <div className="p-3">{verb.gerund}</div>
                <div className="p-3">{verb.translation}</div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No se encontraron verbos con ese criterio de búsqueda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerbsListPage; 