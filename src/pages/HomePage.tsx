import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MarkmapSelector } from '../components/markmap/MarkmapSelector';
import { useTheme } from '../hooks/useTheme';
import { BookOpenIcon, ClipboardIcon, PuzzlePieceIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export const HomePage = () => {
  const [showMap, setShowMap] = useState(false);
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'tenses' | 'verbs'>('tenses');

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

      <div className="max-w-3xl mx-auto mb-8 text-center text-gray-600">
        <p>
          Aprende de manera visual y efectiva los tiempos verbales y verbos en inglés, 
          con ejemplos prácticos y explicaciones claras.
        </p>
      </div>
      
      <div className="mb-8 flex justify-center">
        <div className="flex rounded-lg overflow-hidden">
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'tenses' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveTab('tenses')}
          >
            Tiempos Verbales
          </button>
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'verbs' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveTab('verbs')}
          >
            Verbos
          </button>
        </div>
      </div>
      
      {activeTab === 'tenses' ? (
        // Sección de Tiempos Verbales
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Explora los Tiempos Verbales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-blue-600">Presente</h3>
                <p className="text-gray-600 mb-4">
                  Aprende a hablar sobre acciones habituales y verdades generales.
                </p>
                <Link 
                  to="/tenses/simple-present" 
                  className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded"
                >
                  Ver más
                </Link>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-blue-600">Pasado</h3>
                <p className="text-gray-600 mb-4">
                  Descubre cómo contar historias y hablar de experiencias pasadas.
                </p>
                <Link 
                  to="/tenses/simple-past" 
                  className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded"
                >
                  Ver más
                </Link>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-blue-600">Futuro</h3>
                <p className="text-gray-600 mb-4">
                  Aprende a expresar planes, intenciones y predicciones.
                </p>
                <Link 
                  to="/tenses/simple-future" 
                  className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded"
                >
                  Ver más
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <Link 
              to="/tenses" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg"
            >
              Ver todos los tiempos verbales
            </Link>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Mapas Mentales</h3>
            <p className="mb-4">
              Visualiza los tiempos verbales con mapas mentales interactivos
            </p>
            <MarkmapSelector />
          </div>
        </div>
      ) : (
        // Sección de Verbos
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Domina los Verbos en Inglés
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-emerald-600">Lista de Verbos</h3>
                <p className="text-gray-600 mb-4">
                  Explora listas completas de verbos regulares e irregulares con sus formas.
                </p>
                <Link 
                  to="/verbs/list" 
                  className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded"
                >
                  Ver lista completa
                </Link>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-indigo-600">Tarjetas de Estudio</h3>
                <p className="text-gray-600 mb-4">
                  Practica con flashcards interactivas para memorizar verbos rápidamente.
                </p>
                <Link 
                  to="/verbs/flashcards" 
                  className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded"
                >
                  Practicar con tarjetas
                </Link>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-amber-600">Conjugación de Verbos</h3>
                <p className="text-gray-600 mb-4">
                  Aprende a conjugar cualquier verbo en todos los tiempos verbales.
                </p>
                <Link 
                  to="/verbs/conjugation" 
                  className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded"
                >
                  Conjugar verbos
                </Link>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-purple-600">Patrones de Verbos Irregulares</h3>
                <p className="text-gray-600 mb-4">
                  Descubre los patrones que siguen los verbos irregulares para memorizarlos más fácilmente.
                </p>
                <Link 
                  to="/verbs/patterns" 
                  className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded"
                >
                  Ver patrones
                </Link>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4">¿Por qué estudiar verbos específicamente?</h3>
            <p className="mb-2">
              Los verbos son fundamentales en cualquier idioma. Dominar los verbos en inglés te permitirá:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Comunicarte con mayor precisión y fluidez</li>
              <li>Entender mejor textos y conversaciones en inglés</li>
              <li>Construir correctamente oraciones en todos los tiempos verbales</li>
              <li>Expresar acciones, estados y procesos con claridad</li>
            </ul>
            <p>
              Comienza a practicar con nuestras herramientas interactivas y mejora tu dominio del inglés.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}; 