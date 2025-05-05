import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

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
  const { theme } = useTheme();

  // Estilos adaptados para modo oscuro
  const cardStyle = {
    perspective: '1000px', 
    height: '250px',
    backgroundColor: theme === 'light' ? '#ffffff' : '#1e293b',
    boxShadow: theme === 'light' 
      ? '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)' 
      : '0 4px 6px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3)'
  };

  return (
    <div 
      className={`w-full rounded-xl overflow-hidden cursor-pointer transition-transform duration-700 transform ${
        flipped ? 'scale-[-1,1]' : ''
      }`}
      style={cardStyle}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="relative w-full h-full">
        {/* Frente de la tarjeta - Inglés */}
        <div 
          className={`absolute w-full h-full p-6 flex flex-col justify-between transition-opacity duration-300 ${
            flipped ? 'opacity-0' : 'opacity-100'
          } ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}
        >
          <div>
            <h2 className={`text-2xl font-bold text-center mb-2 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
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
          <div className={`text-sm text-center ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            (Toca para ver la traducción)
          </div>
        </div>

        {/* Reverso de la tarjeta - Español */}
        <div 
          className={`absolute w-full h-full p-6 flex flex-col justify-center items-center transition-opacity duration-300 transform scale-x-[-1] ${
            flipped ? 'opacity-100' : 'opacity-0'
          } ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}
        >
          <h2 className={`text-3xl font-bold mb-4 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`}>
            {verb.translation}
          </h2>
          <div className="text-xl">
            {verb.infinitive}
          </div>
          <div className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            (Toca para ver las conjugaciones)
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerbCard; 