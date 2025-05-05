import React from 'react';

type VerbTense = {
  name: string;
  nameEs: string;
  forms: {
    I: string;
    you: string;
    he: string;
    she: string;
    it: string;
    we: string;
    they: string;
  };
};

interface VerbConjugationTableProps {
  verb: {
    infinitive: string;
    past_simple: string;
    past_participle: string;
    gerund: string;
    translation: string;
  };
}

export const VerbConjugationTable: React.FC<VerbConjugationTableProps> = ({ verb }) => {
  // Generar conjugaciones del verbo en diferentes tiempos
  const generateConjugations = () => {
    const tenses: VerbTense[] = [
      {
        name: 'Simple Present',
        nameEs: 'Presente Simple',
        forms: {
          I: `${verb.infinitive}`,
          you: `${verb.infinitive}`,
          he: `${verb.infinitive}s`,
          she: `${verb.infinitive}s`,
          it: `${verb.infinitive}s`,
          we: `${verb.infinitive}`,
          they: `${verb.infinitive}`
        }
      },
      {
        name: 'Present Continuous',
        nameEs: 'Presente Continuo',
        forms: {
          I: `am ${verb.gerund}`,
          you: `are ${verb.gerund}`,
          he: `is ${verb.gerund}`,
          she: `is ${verb.gerund}`,
          it: `is ${verb.gerund}`,
          we: `are ${verb.gerund}`,
          they: `are ${verb.gerund}`
        }
      },
      {
        name: 'Simple Past',
        nameEs: 'Pasado Simple',
        forms: {
          I: `${verb.past_simple}`,
          you: `${verb.past_simple}`,
          he: `${verb.past_simple}`,
          she: `${verb.past_simple}`,
          it: `${verb.past_simple}`,
          we: `${verb.past_simple}`,
          they: `${verb.past_simple}`
        }
      },
      {
        name: 'Present Perfect',
        nameEs: 'Presente Perfecto',
        forms: {
          I: `have ${verb.past_participle}`,
          you: `have ${verb.past_participle}`,
          he: `has ${verb.past_participle}`,
          she: `has ${verb.past_participle}`,
          it: `has ${verb.past_participle}`,
          we: `have ${verb.past_participle}`,
          they: `have ${verb.past_participle}`
        }
      },
      {
        name: 'Future Simple',
        nameEs: 'Futuro Simple',
        forms: {
          I: `will ${verb.infinitive}`,
          you: `will ${verb.infinitive}`,
          he: `will ${verb.infinitive}`,
          she: `will ${verb.infinitive}`,
          it: `will ${verb.infinitive}`,
          we: `will ${verb.infinitive}`,
          they: `will ${verb.infinitive}`
        }
      }
    ];

    return tenses;
  };

  const conjugations = generateConjugations();

  return (
    <div className="overflow-x-auto">
      <div className="text-xl font-bold mb-4 text-center text-blue-600">
        {verb.infinitive} <span className="text-gray-500">({verb.translation})</span>
      </div>
      
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Pronombre</th>
            {conjugations.map((tense, index) => (
              <th key={index} className="border p-2">
                <div>{tense.name}</div>
                <div className="text-sm text-gray-600">{tense.nameEs}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {['I', 'you', 'he', 'she', 'it', 'we', 'they'].map((pronoun, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="border p-2 font-medium">{pronoun}</td>
              {conjugations.map((tense, tenseIndex) => (
                <td key={tenseIndex} className="border p-2">
                  {tense.forms[pronoun as keyof typeof tense.forms]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-1">Formas básicas:</h3>
          <ul className="list-disc pl-5">
            <li><span className="font-medium">Infinitivo:</span> {verb.infinitive}</li>
            <li><span className="font-medium">Pasado Simple:</span> {verb.past_simple}</li>
            <li><span className="font-medium">Participio Pasado:</span> {verb.past_participle}</li>
            <li><span className="font-medium">Gerundio:</span> {verb.gerund}</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-1">Consejos de uso:</h3>
          <ul className="list-disc pl-5">
            <li>Presente Simple para hábitos y verdades generales</li>
            <li>Presente Continuo para acciones en progreso</li>
            <li>Pasado Simple para acciones completadas en el pasado</li>
            <li>Presente Perfecto para experiencias o acciones recientes</li>
            <li>Futuro Simple para predicciones y decisiones espontáneas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerbConjugationTable; 