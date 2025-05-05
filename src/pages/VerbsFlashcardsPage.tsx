import { useState, useEffect } from 'react';
import { VerbCard } from '../components/verbs/VerbCard';
import regularVerbs from '../data/json/regular_verbs.json';
import irregularVerbs from '../data/json/irregular_verbs.json';

type Verb = {
  infinitive: string;
  past_simple: string;
  past_participle: string;
  gerund: string;
  translation: string;
};

export const VerbsFlashcardsPage = () => {
  const [verbType, setVerbType] = useState<'regular' | 'irregular'>('irregular');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledVerbs, setShuffledVerbs] = useState<Verb[]>([]);

  // Función para barajar los verbos
  const shuffleVerbs = (verbs: Verb[]) => {
    return [...verbs].sort(() => Math.random() - 0.5);
  };

  // Inicializar los verbos barajados al cargar o cambiar de tipo
  useEffect(() => {
    const verbs = verbType === 'regular' 
      ? regularVerbs.regular_verbs 
      : irregularVerbs.irregular_verbs;
    
    setShuffledVerbs(shuffleVerbs(verbs));
    setCurrentIndex(0);
  }, [verbType]);

  // Manejadores para navegación
  const handleNext = () => {
    if (currentIndex < shuffledVerbs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleShuffle = () => {
    setShuffledVerbs(shuffleVerbs(shuffledVerbs));
    setCurrentIndex(0);
  };

  // Si no hay verbos cargados aún
  if (shuffledVerbs.length === 0) {
    return <div className="text-center py-8">Cargando verbos...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Tarjetas de Estudio - {verbType === 'regular' ? 'Verbos Regulares' : 'Verbos Irregulares'}
      </h1>

      <div className="flex justify-center space-x-4 mb-8">
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

      <div className="mb-8 max-w-md mx-auto">
        <VerbCard verb={shuffledVerbs[currentIndex]} />
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Anterior
        </button>
        
        <div className="text-center">
          <span className="font-medium">{currentIndex + 1}</span> de {shuffledVerbs.length}
        </div>
        
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={currentIndex === shuffledVerbs.length - 1}
        >
          Siguiente
        </button>
      </div>

      <div className="mt-6 text-center">
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded"
          onClick={handleShuffle}
        >
          Barajar Verbos
        </button>
      </div>
    </div>
  );
};

export default VerbsFlashcardsPage; 