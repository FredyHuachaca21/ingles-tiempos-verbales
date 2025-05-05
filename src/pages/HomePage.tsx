import { useState } from 'react';
import { MarkmapSelector } from '../components/markmap/MarkmapSelector';
import { useTheme } from '../hooks/useTheme';

export const HomePage = () => {
  const [showMap, setShowMap] = useState(false);
  const { theme } = useTheme();
  
  // Si estamos mostrando el mapa, ocupará toda la sección principal
  if (showMap) {
    return (
      <div className="w-full relative">
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
            Ocultar Mapa Mental
          </button>
        </div>
        <div className="transition-all duration-300 ease-in-out">
          <MarkmapSelector />
        </div>
      </div>
    );
  }
  
  // Diseño bento para la página de inicio
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta principal (ocupa 2 columnas en desktop) */}
        <div 
          className={`col-span-1 md:col-span-2 rounded-2xl p-8 transition-all duration-300 ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}
          style={{
            boxShadow: theme === 'light' 
              ? '10px 10px 20px rgba(0,0,0,0.05), -10px -10px 20px rgba(255,255,255,0.5)' 
              : '10px 10px 20px rgba(0,0,0,0.1)'
          }}
        >
          <h1 className={`text-4xl font-bold mb-6 ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>
            Aprende Tiempos Verbales en Inglés
          </h1>
          <p className={`text-xl mb-8 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Visualiza los tiempos verbales en inglés a través de mapas mentales interactivos.
            Navega entre verbos regulares e irregulares y explora su conjugación en diferentes tiempos.
          </p>
          <button
            onClick={() => setShowMap(true)}
            className={`px-6 py-3 rounded-full font-medium text-lg transition-all duration-300 ${
              theme === 'light' 
                ? 'bg-gray-50 text-gray-700 hover:text-gray-900' 
                : 'bg-gray-700 text-gray-200 hover:text-white'
            }`}
            style={{
              boxShadow: theme === 'light' 
                ? '5px 5px 10px rgba(0,0,0,0.1), -5px -5px 10px rgba(255,255,255,0.8)' 
                : '5px 5px 10px rgba(0,0,0,0.2)'
            }}
          >
            Mostrar Mapa Mental
          </button>
        </div>
        
        {/* Tarjeta de verbos regulares */}
        <div 
          className={`rounded-2xl p-6 transition-all duration-300 ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}
          style={{
            boxShadow: theme === 'light' 
              ? '10px 10px 20px rgba(0,0,0,0.05), -10px -10px 20px rgba(255,255,255,0.5)' 
              : '10px 10px 20px rgba(0,0,0,0.1)'
          }}
        >
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>
            Verbos Regulares
          </h2>
          <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Los verbos regulares en inglés siguen un patrón predecible para formar el pasado y participio.
          </p>
          <a 
            href="/regulares" 
            className={`inline-block px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              theme === 'light' 
                ? 'bg-gray-50 text-gray-700 hover:text-gray-900' 
                : 'bg-gray-700 text-gray-200 hover:text-white'
            }`}
            style={{
              boxShadow: theme === 'light' 
                ? '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)' 
                : '3px 3px 6px rgba(0,0,0,0.2)'
            }}
          >
            Explorar
          </a>
        </div>
        
        {/* Tarjeta de verbos irregulares */}
        <div 
          className={`rounded-2xl p-6 transition-all duration-300 ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}
          style={{
            boxShadow: theme === 'light' 
              ? '10px 10px 20px rgba(0,0,0,0.05), -10px -10px 20px rgba(255,255,255,0.5)' 
              : '10px 10px 20px rgba(0,0,0,0.1)'
          }}
        >
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>
            Verbos Irregulares
          </h2>
          <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Los verbos irregulares en inglés tienen formas únicas en el pasado y participio.
          </p>
          <a 
            href="/irregulares" 
            className={`inline-block px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              theme === 'light' 
                ? 'bg-gray-50 text-gray-700 hover:text-gray-900' 
                : 'bg-gray-700 text-gray-200 hover:text-white'
            }`}
            style={{
              boxShadow: theme === 'light' 
                ? '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)' 
                : '3px 3px 6px rgba(0,0,0,0.2)'
            }}
          >
            Explorar
          </a>
        </div>
        
        {/* Tarjeta de ejercicios */}
        <div 
          className={`rounded-2xl p-6 transition-all duration-300 ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}
          style={{
            boxShadow: theme === 'light' 
              ? '10px 10px 20px rgba(0,0,0,0.05), -10px -10px 20px rgba(255,255,255,0.5)' 
              : '10px 10px 20px rgba(0,0,0,0.1)'
          }}
        >
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>
            Ejercicios
          </h2>
          <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Practica lo aprendido con ejercicios interactivos para mejorar tu dominio.
          </p>
          <a 
            href="/ejercicios" 
            className={`inline-block px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              theme === 'light' 
                ? 'bg-gray-50 text-gray-700 hover:text-gray-900' 
                : 'bg-gray-700 text-gray-200 hover:text-white'
            }`}
            style={{
              boxShadow: theme === 'light' 
                ? '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)' 
                : '3px 3px 6px rgba(0,0,0,0.2)'
            }}
          >
            Practicar
          </a>
        </div>
        
        {/* Tarjeta de ayuda/guía */}
        <div 
          className={`md:col-span-2 rounded-2xl p-6 transition-all duration-300 ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}
          style={{
            boxShadow: theme === 'light' 
              ? '10px 10px 20px rgba(0,0,0,0.05), -10px -10px 20px rgba(255,255,255,0.5)' 
              : '10px 10px 20px rgba(0,0,0,0.1)'
          }}
        >
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>
            ¿Cómo utilizar los mapas mentales?
          </h2>
          <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Los mapas mentales son una herramienta visual que te ayuda a entender la estructura de los tiempos verbales.
            Puedes hacer zoom, expandir/colapsar nodos y moverte por el mapa para explorar diferentes aspectos gramaticales.
          </p>
          <button
            onClick={() => setShowMap(true)}
            className={`inline-block px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              theme === 'light' 
                ? 'bg-gray-50 text-gray-700 hover:text-gray-900' 
                : 'bg-gray-700 text-gray-200 hover:text-white'
            }`}
            style={{
              boxShadow: theme === 'light' 
                ? '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)' 
                : '3px 3px 6px rgba(0,0,0,0.2)'
            }}
          >
            Explorar mapas
          </button>
        </div>
      </div>
    </div>
  );
}; 