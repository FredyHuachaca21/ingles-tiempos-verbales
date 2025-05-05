import { useState, useEffect } from 'react';
import { VerbCard } from '../components/verbs/VerbCard';
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

export const VerbsFlashcardsPage = () => {
  const [verbType, setVerbType] = useState<'regular' | 'irregular'>('irregular');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledVerbs, setShuffledVerbs] = useState<Verb[]>([]);
  const { theme } = useTheme();
  const navigate = useNavigate();

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

  // Estilos neumórficos
  const neuButtonStyle = {
    backgroundColor: theme === 'light' ? '#f0f0f3' : '#2a2a2e',
    boxShadow: theme === 'light' 
      ? '5px 5px 10px rgba(174, 174, 192, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.8)' 
      : '5px 5px 10px rgba(0, 0, 0, 0.4), -5px -5px 10px rgba(65, 65, 77, 0.2)',
    transition: 'all 0.2s ease'
  };

  const neuActiveButtonStyle = {
    backgroundColor: theme === 'light' ? '#e6e7ef' : '#2a2a2e',
    boxShadow: theme === 'light' 
      ? 'inset 3px 3px 6px rgba(174, 174, 192, 0.4), inset -3px -3px 6px rgba(255, 255, 255, 0.8)' 
      : 'inset 3px 3px 6px rgba(0, 0, 0, 0.4), inset -3px -3px 6px rgba(65, 65, 77, 0.2)',
  };

  // Si no hay verbos cargados aún
  if (shuffledVerbs.length === 0) {
    return (
      <div className={`flex justify-center items-center h-60 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
        Cargando verbos...
      </div>
    );
  }

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
          Tarjetas de Estudio
        </h1>
        
        <div className="w-10"></div> {/* Spacer para centrar el título */}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm sm:text-base`}
          style={verbType === 'regular' ? {...neuActiveButtonStyle, color: theme === 'light' ? '#4b7bec' : '#74b9ff'} : neuButtonStyle}
          onClick={() => setVerbType('regular')}
        >
          Verbos Regulares
        </button>
        <button
          className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm sm:text-base`}
          style={verbType === 'irregular' ? {...neuActiveButtonStyle, color: theme === 'light' ? '#4b7bec' : '#74b9ff'} : neuButtonStyle}
          onClick={() => setVerbType('irregular')}
        >
          Verbos Irregulares
        </button>
      </div>

      <div className="mb-8 max-w-md mx-auto">
        <VerbCard verb={shuffledVerbs[currentIndex]} />
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        <button
          className={`px-5 py-2 rounded-xl transition-all duration-300 ${currentIndex === 0 ? 'opacity-50' : ''}`}
          style={neuButtonStyle}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          ← Anterior
        </button>
        
        <div className={`px-4 py-2 rounded-lg ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
          <span className="font-medium">{currentIndex + 1}</span> de {shuffledVerbs.length}
        </div>
        
        <button
          className={`px-5 py-2 rounded-xl transition-all duration-300 ${currentIndex === shuffledVerbs.length - 1 ? 'opacity-50' : ''}`}
          style={neuButtonStyle}
          onClick={handleNext}
          disabled={currentIndex === shuffledVerbs.length - 1}
        >
          Siguiente →
        </button>
      </div>

      <div className="mt-8 text-center">
        <button
          className={`px-5 py-3 rounded-xl transition-all duration-300 ${
            theme === 'light' 
              ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' 
              : 'bg-amber-900/20 text-amber-300 hover:bg-amber-900/30'
          }`}
          style={neuButtonStyle}
          onClick={handleShuffle}
        >
          🔄 Barajar Verbos
        </button>
      </div>
      
      <div className="mt-8 text-center">
        <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          Practica con {shuffledVerbs.length} verbos {verbType === 'regular' ? 'regulares' : 'irregulares'}
        </p>
      </div>
    </div>
  );
};

export default VerbsFlashcardsPage; 