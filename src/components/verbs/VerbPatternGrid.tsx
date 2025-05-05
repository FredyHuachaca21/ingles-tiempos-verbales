import { useState } from 'react';
import irregularVerbs from '../../data/json/irregular_verbs.json';
import { useTheme } from '../../hooks/useTheme';

type VerbPattern = {
  pattern: string;
  description: string;
  verbs: {
    infinitive: string;
    past_simple: string;
    past_participle: string;
    translation: string;
  }[];
};

export const VerbPatternGrid = () => {
  const [selectedPattern, setSelectedPattern] = useState<VerbPattern | null>(null);
  const { theme } = useTheme();

  // Definir algunos patrones comunes en verbos irregulares
  const patterns: VerbPattern[] = [
    {
      pattern: "same-all-forms",
      description: "Verbos que mantienen la misma forma en infinitivo, pasado simple y participio pasado",
      verbs: irregularVerbs.irregular_verbs.filter(verb => 
        verb.infinitive === verb.past_simple && verb.past_simple === verb.past_participle
      )
    },
    {
      pattern: "vowel-gradation-i-a-u",
      description: "Verbos que siguen el patrón i → a → u",
      verbs: irregularVerbs.irregular_verbs.filter(verb => 
        verb.infinitive.includes('i') && 
        verb.past_simple.includes('a') && 
        verb.past_participle.includes('u')
      )
    },
    {
      pattern: "ing-ang-ung",
      description: "Verbos que terminan en -ing, -ang, -ung",
      verbs: irregularVerbs.irregular_verbs.filter(verb => 
        verb.infinitive.endsWith('ing') && 
        verb.past_simple.endsWith('ang') && 
        verb.past_participle.endsWith('ung')
      )
    },
    {
      pattern: "ow-ew-own",
      description: "Verbos con el patrón -ow, -ew, -own",
      verbs: irregularVerbs.irregular_verbs.filter(verb => 
        verb.infinitive.includes('ow') && 
        verb.past_simple.includes('ew') && 
        verb.past_participle.includes('own')
      )
    },
    {
      pattern: "eat-ate-eaten",
      description: "Verbos con el patrón -eat, -ate, -eaten",
      verbs: irregularVerbs.irregular_verbs.filter(verb => 
        verb.infinitive.includes('eat') && 
        verb.past_simple.includes('ate') && 
        verb.past_participle.includes('eaten')
      )
    },
    {
      pattern: "eak-oke-oken",
      description: "Verbos con el patrón -eak, -oke, -oken",
      verbs: irregularVerbs.irregular_verbs.filter(verb => 
        verb.infinitive.includes('eak') && 
        verb.past_simple.includes('oke') && 
        verb.past_participle.includes('oken')
      )
    },
    {
      pattern: "ed-ed-ed",
      description: "Verbos que terminan en -d/-t con formas similares",
      verbs: irregularVerbs.irregular_verbs.filter(verb => 
        (verb.infinitive.endsWith('d') || verb.infinitive.endsWith('t')) &&
        verb.past_simple === verb.past_participle
      )
    }
  ];

  // Ordenar los patrones por cantidad de verbos (descendente)
  const sortedPatterns = [...patterns].sort((a, b) => b.verbs.length - a.verbs.length);

  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Patrones de Verbos Irregulares
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {sortedPatterns.map((pattern, index) => (
          <div 
            key={index}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedPattern?.pattern === pattern.pattern 
                ? theme === 'light'
                  ? 'bg-blue-100 border-blue-400' 
                  : 'bg-blue-900/30 border-blue-700'
                : theme === 'light'
                  ? 'bg-white hover:bg-gray-50 border-gray-200'
                  : 'bg-gray-800 hover:bg-gray-700 border-gray-700'
            }`}
            onClick={() => setSelectedPattern(pattern)}
          >
            <h3 className="font-bold mb-2">{pattern.description}</h3>
            <div className="flex justify-between text-sm">
              <span>{pattern.verbs.length} verbos</span>
              <span className={theme === 'light' ? 'text-blue-600' : 'text-blue-400'}>Ver detalles</span>
            </div>
          </div>
        ))}
      </div>
      
      {selectedPattern && (
        <div className={`border rounded-lg p-6 shadow-md ${
          theme === 'light' 
            ? 'bg-white border-gray-200' 
            : 'bg-gray-800 border-gray-700'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {selectedPattern.description}
          </h3>
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
              <thead>
                <tr className={theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}>
                  <th className={`px-4 py-2 text-left ${theme === 'dark' ? 'text-gray-300' : ''}`}>Infinitivo</th>
                  <th className={`px-4 py-2 text-left ${theme === 'dark' ? 'text-gray-300' : ''}`}>Pasado Simple</th>
                  <th className={`px-4 py-2 text-left ${theme === 'dark' ? 'text-gray-300' : ''}`}>Participio Pasado</th>
                  <th className={`px-4 py-2 text-left ${theme === 'dark' ? 'text-gray-300' : ''}`}>Traducción</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
                {selectedPattern.verbs.map((verb, index) => (
                  <tr key={index} className={
                    theme === 'light' 
                      ? 'hover:bg-gray-50' 
                      : 'hover:bg-gray-700'
                  }>
                    <td className="px-4 py-2 font-medium">{verb.infinitive}</td>
                    <td className="px-4 py-2">{verb.past_simple}</td>
                    <td className="px-4 py-2">{verb.past_participle}</td>
                    <td className={`px-4 py-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{verb.translation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            <p>
              <strong>Consejo:</strong> Memorizar verbos en grupos con patrones similares facilita su aprendizaje.
              Practica la conjugación de estos verbos utilizando las mismas reglas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerbPatternGrid; 