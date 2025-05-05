import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MarkmapSelector } from '../components/markmap/MarkmapSelector';
import { useTheme } from '../hooks/useTheme';
import { BookOpenIcon, ClipboardIcon, PuzzlePieceIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export const HomePage = () => {
  const [showMap, setShowMap] = useState(false);
  const { theme } = useTheme();

  const cards = [
    {
      title: 'Tiempos Verbales',
      description: 'Aprende todos los tiempos verbales en inglés con explicaciones detalladas.',
      icon: <BookOpenIcon className="h-8 w-8" />,
      path: '/tenses'
    },
    {
      title: 'Verbos Regulares',
      description: 'Listado completo de verbos regulares con sus formas.',
      icon: <ClipboardIcon className="h-8 w-8" />,
      path: '/regulares'
    },
    {
      title: 'Verbos Irregulares',
      description: 'Explora los verbos irregulares más comunes y sus particularidades.',
      icon: <AcademicCapIcon className="h-8 w-8" />,
      path: '/irregulares'
    },
    {
      title: 'Ejercicios',
      description: 'Pon a prueba tus conocimientos con ejercicios prácticos.',
      icon: <PuzzlePieceIcon className="h-8 w-8" />,
      path: '/ejercicios'
    }
  ];

  // Si estamos mostrando el mapa, ocupará toda la sección principal
  if (showMap) {
    return (
      <div className="w-full h-full relative pb-10" style={{ minHeight: 'calc(100vh - 180px)' }}>
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setShowMap(false)}
            className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
              theme === 'light' 
                ? 'bg-gray-50 text-gray-700 hover:text-gray-900' 
                : 'bg-gray-700 text-gray-200 hover:text-white'
            }`}
            style={{
              boxShadow: theme === 'light' 
                ? '3px 3px 6px rgba(0,0,0,0.1), -3px -3px 6px rgba(255,255,255,0.7)' 
                : '3px 3px 6px rgba(0,0,0,0.2)'
            }}
          >
            ← Volver
          </button>
        </div>
        <MarkmapSelector />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          Aprende los Tiempos Verbales en Inglés
        </h1>
        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Domina todos los tiempos verbales del inglés con explicaciones claras, ejemplos y ejercicios prácticos.
        </p>
      </div>

      {/* Sección de mapa mental */}
      <div 
        className={`rounded-xl overflow-hidden mb-12 ${
          theme === 'light' ? 'bg-white' : 'bg-gray-800'
        }`}
        style={{
          boxShadow: theme === 'light' 
            ? '10px 10px 20px rgba(0,0,0,0.05), -10px -10px 20px rgba(255,255,255,0.8)' 
            : '10px 10px 20px rgba(0,0,0,0.1)'
        }}
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                Mapa Mental de Tiempos Verbales
              </h2>
              <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                Visualiza la estructura de los tiempos verbales en inglés de manera interactiva.
              </p>
            </div>
            <button
              onClick={() => setShowMap(true)}
              className={`mt-4 md:mt-0 px-6 py-3 rounded-lg transition-all duration-300 ${
                theme === 'light' 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              style={{
                boxShadow: theme === 'light' 
                  ? '3px 3px 6px rgba(0,0,0,0.1), -3px -3px 6px rgba(255,255,255,0.7)' 
                  : '3px 3px 6px rgba(0,0,0,0.2)'
              }}
            >
              Ver Mapa Mental
            </button>
          </div>
          <div 
            className={`h-48 rounded-lg ${
              theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => setShowMap(true)}
          >
            <div className="text-center">
              <BookOpenIcon className={`h-12 w-12 mx-auto mb-2 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
              <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Haz clic para explorar el mapa mental</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de tarjetas de acceso a las secciones principales */}
      <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
        Recursos de Aprendizaje
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            className={`block rounded-xl overflow-hidden transition-all duration-300 h-full ${
              theme === 'light' ? 'bg-white hover:bg-gray-50' : 'bg-gray-800 hover:bg-gray-700'
            }`}
            style={{
              boxShadow: theme === 'light' 
                ? '8px 8px 16px rgba(0,0,0,0.05), -8px -8px 16px rgba(255,255,255,0.8)' 
                : '8px 8px 16px rgba(0,0,0,0.1)',
            }}
          >
            <div className="p-6">
              <div 
                className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${
                  theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30'
                }`}
              >
                <div className={theme === 'light' ? 'text-blue-600' : 'text-blue-300'}>
                  {card.icon}
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                {card.title}
              </h3>
              <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}; 