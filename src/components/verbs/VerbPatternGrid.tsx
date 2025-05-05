import { useState } from 'react';
import irregularVerbs from '../../data/json/irregular_verbs.json';

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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Patrones de Verbos Irregulares
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {sortedPatterns.map((pattern, index) => (
          <div 
            key={index}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedPattern?.pattern === pattern.pattern 
                ? 'bg-blue-100 border-blue-400' 
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => setSelectedPattern(pattern)}
          >
            <h3 className="font-bold mb-2">{pattern.description}</h3>
            <div className="flex justify-between text-sm">
              <span>{pattern.verbs.length} verbos</span>
              <span className="text-blue-600">Ver detalles</span>
            </div>
          </div>
        ))}
      </div>
      
      {selectedPattern && (
        <div className="bg-white border rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4">{selectedPattern.description}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Infinitivo</th>
                  <th className="px-4 py-2 text-left">Pasado Simple</th>
                  <th className="px-4 py-2 text-left">Participio Pasado</th>
                  <th className="px-4 py-2 text-left">Traducción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedPattern.verbs.map((verb, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{verb.infinitive}</td>
                    <td className="px-4 py-2">{verb.past_simple}</td>
                    <td className="px-4 py-2">{verb.past_participle}</td>
                    <td className="px-4 py-2 text-gray-600">{verb.translation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
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