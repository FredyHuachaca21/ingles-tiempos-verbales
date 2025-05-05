import { useState } from 'react';

interface VerbCardProps {
  verb: {
    infinitive: string;
    past_simple: string;
    past_participle: string;
    gerund: string;
    translation: string;
  };
}

export const VerbCard = ({ verb }: VerbCardProps) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className={`w-full bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform duration-700 transform ${
        flipped ? 'scale-[-1,1]' : ''
      }`}
      style={{ perspective: '1000px', height: '250px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="relative w-full h-full">
        {/* Frente de la tarjeta - Inglés */}
        <div 
          className={`absolute w-full h-full p-6 flex flex-col justify-between transition-opacity duration-300 ${
            flipped ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div>
            <h2 className="text-2xl font-bold text-center mb-2 text-blue-600">
              {verb.infinitive}
            </h2>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span className="font-medium">Pasado Simple:</span>
                <span>{verb.past_simple}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Participio Pasado:</span>
                <span>{verb.past_participle}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Gerundio:</span>
                <span>{verb.gerund}</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500 text-center">
            (Toca para ver la traducción)
          </div>
        </div>

        {/* Reverso de la tarjeta - Español */}
        <div 
          className={`absolute w-full h-full p-6 flex flex-col justify-center items-center transition-opacity duration-300 transform scale-x-[-1] ${
            flipped ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="text-3xl font-bold mb-4 text-green-600">
            {verb.translation}
          </h2>
          <div className="text-xl">
            {verb.infinitive}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            (Toca para ver las conjugaciones)
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerbCard; 