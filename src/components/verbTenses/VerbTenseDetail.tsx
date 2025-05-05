import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useVerbTense } from '../../hooks/useVerbTense';

interface Example {
  en: string;
  es: string;
}

export const VerbTenseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'structure' | 'examples' | 'uses'>('structure');
  
  const tense = useVerbTense(id);
  
  if (!tense) {
    return (
      <div className={`p-6 rounded-xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
        <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
          Tiempo verbal no encontrado. Volviendo al listado...
        </p>
      </div>
    );
  }
  
  // Color específico para la categoría del tiempo verbal
  const getCategoryColor = () => {
    switch(tense.category) {
      case 'present':
        return theme === 'light' ? '#34D399' : '#10B981'; // Verde
      case 'past':
        return theme === 'light' ? '#60A5FA' : '#3B82F6'; // Azul
      case 'future':
        return theme === 'light' ? '#F472B6' : '#EC4899'; // Rosa
      default:
        return theme === 'light' ? '#A78BFA' : '#8B5CF6'; // Púrpura (por defecto)
    }
  };
  
  // Clase de fondo para la categoría
  const getCategoryBgClass = () => {
    switch(tense.category) {
      case 'present':
        return theme === 'light' ? 'bg-green-50' : 'bg-green-900/30';
      case 'past':
        return theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/30';
      case 'future':
        return theme === 'light' ? 'bg-pink-50' : 'bg-pink-900/30';
      default:
        return theme === 'light' ? 'bg-purple-50' : 'bg-purple-900/30';
    }
  };
  
  return (
    <div className="w-full py-4">
      {/* Encabezado */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/tenses')}
          className={`mb-4 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
            theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-700 text-gray-200'
          }`}
          style={{
            boxShadow: theme === 'light' 
              ? '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)' 
              : '3px 3px 6px rgba(0,0,0,0.2)'
          }}
        >
          ← Volver a todos los tiempos
        </button>
        
        <div className={`p-6 rounded-xl mb-8 ${getCategoryBgClass()}`}>
          <h1 
            className={`text-3xl font-bold mb-2 ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            }`}
          >
            {tense.name}
          </h1>
          <h2 
            className={`text-xl mb-4 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}
            style={{ color: getCategoryColor() }}
          >
            {tense.nameEs}
          </h2>
          <p 
            className={`text-lg ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}
          >
            {tense.shortDesc}
          </p>
        </div>
        
        {/* Pestañas de navegación */}
        <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`py-3 px-6 font-medium transition-all duration-300 ${
              activeTab === 'structure'
                ? (theme === 'light' 
                  ? 'border-b-2 border-gray-800 text-gray-800' 
                  : 'border-b-2 border-white text-white')
                : (theme === 'light'
                  ? 'text-gray-500 hover:text-gray-800'
                  : 'text-gray-400 hover:text-white')
            }`}
            onClick={() => setActiveTab('structure')}
          >
            Estructura
          </button>
          <button
            className={`py-3 px-6 font-medium transition-all duration-300 ${
              activeTab === 'examples'
                ? (theme === 'light' 
                  ? 'border-b-2 border-gray-800 text-gray-800' 
                  : 'border-b-2 border-white text-white')
                : (theme === 'light'
                  ? 'text-gray-500 hover:text-gray-800'
                  : 'text-gray-400 hover:text-white')
            }`}
            onClick={() => setActiveTab('examples')}
          >
            Ejemplos
          </button>
          <button
            className={`py-3 px-6 font-medium transition-all duration-300 ${
              activeTab === 'uses'
                ? (theme === 'light' 
                  ? 'border-b-2 border-gray-800 text-gray-800' 
                  : 'border-b-2 border-white text-white')
                : (theme === 'light'
                  ? 'text-gray-500 hover:text-gray-800'
                  : 'text-gray-400 hover:text-white')
            }`}
            onClick={() => setActiveTab('uses')}
          >
            Usos
          </button>
        </div>
      </div>
      
      {/* Contenido según la pestaña seleccionada */}
      <div 
        className={`p-6 rounded-xl ${
          theme === 'light' ? 'bg-white' : 'bg-gray-800'
        }`}
        style={{
          boxShadow: theme === 'light' 
            ? '8px 8px 16px rgba(0,0,0,0.05), -8px -8px 16px rgba(255,255,255,0.8)' 
            : '8px 8px 16px rgba(0,0,0,0.1)',
        }}
      >
        {activeTab === 'structure' && (
          <div>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Estructura
            </h3>
            
            <div className="space-y-8">
              {/* Afirmativa */}
              <div className={`p-5 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                  Afirmativa
                </h4>
                <ul className="space-y-2">
                  {tense.structure.affirmative.map((rule, index) => (
                    <li 
                      key={index}
                      className={`py-1 px-2 rounded ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}
                    >
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Negativa */}
              <div className={`p-5 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                  Negativa
                </h4>
                <ul className="space-y-2">
                  {tense.structure.negative.map((rule, index) => (
                    <li 
                      key={index}
                      className={`py-1 px-2 rounded ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}
                    >
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Interrogativa */}
              <div className={`p-5 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                  Interrogativa
                </h4>
                <ul className="space-y-2">
                  {tense.structure.interrogative.map((rule, index) => (
                    <li 
                      key={index}
                      className={`py-1 px-2 rounded ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}
                    >
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Excepciones (si existen) */}
              {tense.exceptions && tense.exceptions.length > 0 && (
                <div className={`p-5 rounded-lg ${
                  theme === 'light' ? 'bg-yellow-50' : 'bg-yellow-900/30'
                }`}>
                  <h4 className={`text-lg font-semibold mb-3 ${
                    theme === 'light' ? 'text-yellow-800' : 'text-yellow-200'
                  }`}>
                    Excepciones
                  </h4>
                  <ul className="space-y-2">
                    {tense.exceptions.map((exception, index) => (
                      <li 
                        key={index}
                        className={`py-1 px-2 rounded ${
                          theme === 'light' ? 'text-yellow-700' : 'text-yellow-100'
                        }`}
                      >
                        {exception}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Marcadores temporales (si existen) */}
              {tense.timeMarkers && tense.timeMarkers.length > 0 && (
                <div className={`p-5 rounded-lg ${
                  theme === 'light' ? 'bg-purple-50' : 'bg-purple-900/30'
                }`}>
                  <h4 className={`text-lg font-semibold mb-3 ${
                    theme === 'light' ? 'text-purple-800' : 'text-purple-200'
                  }`}>
                    Marcadores temporales
                  </h4>
                  <ul className="space-y-2">
                    {tense.timeMarkers.map((marker, index) => (
                      <li 
                        key={index}
                        className={`py-1 px-2 rounded ${
                          theme === 'light' ? 'text-purple-700' : 'text-purple-100'
                        }`}
                      >
                        {marker}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'examples' && (
          <div>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Ejemplos
            </h3>
            
            <div className="space-y-8">
              {/* Ejemplos afirmativos */}
              <div className={`p-5 rounded-lg ${theme === 'light' ? 'bg-green-50' : 'bg-green-900/30'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-green-800' : 'text-green-200'}`}>
                  Oraciones afirmativas
                </h4>
                <div className="space-y-4">
                  {tense.examples.affirmative.map((example, index) => (
                    <ExampleCard key={index} example={example} theme={theme} />
                  ))}
                </div>
              </div>
              
              {/* Ejemplos negativos */}
              <div className={`p-5 rounded-lg ${theme === 'light' ? 'bg-red-50' : 'bg-red-900/30'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-red-800' : 'text-red-200'}`}>
                  Oraciones negativas
                </h4>
                <div className="space-y-4">
                  {tense.examples.negative.map((example, index) => (
                    <ExampleCard key={index} example={example} theme={theme} />
                  ))}
                </div>
              </div>
              
              {/* Ejemplos interrogativos */}
              <div className={`p-5 rounded-lg ${theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/30'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-blue-800' : 'text-blue-200'}`}>
                  Oraciones interrogativas
                </h4>
                <div className="space-y-4">
                  {tense.examples.interrogative.map((example, index) => (
                    <ExampleCard key={index} example={example} theme={theme} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'uses' && (
          <div>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Usos
            </h3>
            
            <div className="space-y-6">
              {tense.uses.map((use, index) => (
                <div 
                  key={index}
                  className={`p-5 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}
                >
                  <h4 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    {use.title}
                  </h4>
                  <p className={`mb-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    {use.description}
                  </p>
                  {use.example && (
                    <div className={`mt-3 p-3 rounded-md ${
                      theme === 'light' ? 'bg-white' : 'bg-gray-800'
                    }`}
                    style={{
                      boxShadow: theme === 'light' 
                        ? '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)' 
                        : '3px 3px 6px rgba(0,0,0,0.1)',
                    }}>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <p className={`font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                          {use.example.en}
                        </p>
                      </div>
                      <div className={`mt-1 pl-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        {use.example.es}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente para mostrar un ejemplo con su traducción
const ExampleCard = ({ example, theme }: { example: Example; theme: string }) => {
  return (
    <div className={`p-4 rounded-md ${
      theme === 'light' ? 'bg-white' : 'bg-gray-800'
    }`}
    style={{
      boxShadow: theme === 'light' 
        ? '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)' 
        : '3px 3px 6px rgba(0,0,0,0.1)',
    }}>
      <p className={`font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
        {example.en}
      </p>
      <p className={`italic ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
        {example.es}
      </p>
    </div>
  );
}; 