import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MarkmapSelector } from '../components/markmap/MarkmapSelector';
import { useTheme } from '../hooks/useTheme';

export const HomePage = () => {
  const [showMap, setShowMap] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

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

  // Estilos neumórficos basados en el tema
  const neuCardStyle = {
    backgroundColor: theme === 'light' ? '#f0f0f3' : '#2a2a2e',
    boxShadow: theme === 'light' 
      ? '10px 10px 20px rgba(174, 174, 192, 0.4), -10px -10px 20px rgba(255, 255, 255, 0.8)' 
      : '10px 10px 20px rgba(0, 0, 0, 0.4), -10px -10px 20px rgba(65, 65, 77, 0.2)',
    transition: 'all 0.3s ease'
  };

  const neuButtonStyle = {
    backgroundColor: theme === 'light' ? '#f0f0f3' : '#2a2a2e',
    boxShadow: theme === 'light' 
      ? '5px 5px 10px rgba(174, 174, 192, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.8)' 
      : '5px 5px 10px rgba(0, 0, 0, 0.4), -5px -5px 10px rgba(65, 65, 77, 0.2)',
    transition: 'all 0.2s ease'
  };

  const hoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: theme === 'light' 
      ? '15px 15px 30px rgba(174, 174, 192, 0.4), -15px -15px 30px rgba(255, 255, 255, 0.8)' 
      : '15px 15px 30px rgba(0, 0, 0, 0.4), -15px -15px 30px rgba(65, 65, 77, 0.2)',
  };

  // Datos de las 3 tarjetas principales
  const mainCards = [
    {
      title: "Mapas Mentales",
      description: "Visualiza los tiempos verbales en forma de mapas mentales interactivos",
      color: theme === 'light' ? "from-blue-200 to-blue-100" : "from-blue-900/30 to-blue-800/30",
      textColor: theme === 'light' ? "text-blue-900" : "text-blue-300",
      action: () => setShowMap(true),
      icon: "📊"
    },
    {
      title: "Tiempos Verbales",
      description: "Explora todos los tiempos verbales en inglés con ejemplos",
      color: theme === 'light' ? "from-emerald-200 to-emerald-100" : "from-emerald-900/30 to-emerald-800/30",
      textColor: theme === 'light' ? "text-emerald-900" : "text-emerald-300",
      action: () => navigate('/tenses'),
      icon: "🕒"
    },
    {
      title: "Verbos",
      description: "Aprende verbos regulares e irregulares con sus conjugaciones",
      color: theme === 'light' ? "from-amber-200 to-amber-100" : "from-amber-900/30 to-amber-800/30",
      textColor: theme === 'light' ? "text-amber-900" : "text-amber-300",
      action: () => navigate('/verbs'),
      icon: "🔤"
    }
  ];

  // Tarjetas adicionales (no funcionales por ahora)
  const additionalCards = [
    {
      title: "Ejercicios",
      description: "Próximamente: Practica con ejercicios interactivos",
      color: theme === 'light' ? "from-purple-200 to-purple-100" : "from-purple-900/30 to-purple-800/30",
      textColor: theme === 'light' ? "text-purple-900" : "text-purple-300",
      icon: "📝",
      disabled: true
    },
    {
      title: "Pronunciación",
      description: "Próximamente: Aprende a pronunciar correctamente",
      color: theme === 'light' ? "from-pink-200 to-pink-100" : "from-pink-900/30 to-pink-800/30",
      textColor: theme === 'light' ? "text-pink-900" : "text-pink-300",
      icon: "🔊",
      disabled: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 
          className={`text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
          style={{
            textShadow: theme === 'light' 
              ? '2px 2px 4px rgba(0,0,0,0.1)' 
              : '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Tiempos Verbales en Inglés
        </h1>
        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Aprende de manera visual y efectiva con nuestras herramientas interactivas
        </p>
      </div>

      {/* Tarjetas principales funcionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {mainCards.map((card, index) => (
          <div 
            key={index}
            className={`rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer h-96`}
            style={neuCardStyle}
            onClick={card.action}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, hoverStyle);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              Object.assign(e.currentTarget.style, neuCardStyle);
            }}
          >
            <div className={`h-1/3 bg-gradient-to-br ${card.color} flex items-center justify-center`}>
              <span className="text-6xl">{card.icon}</span>
            </div>
            <div className="p-6 h-2/3 flex flex-col justify-between">
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${card.textColor}`}>
                  {card.title}
                </h3>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                  {card.description}
                </p>
              </div>
              <div 
                className={`self-start px-6 py-3 rounded-full ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} font-medium`}
                style={neuButtonStyle}
              >
                Explorar
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tarjetas adicionales no funcionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {additionalCards.map((card, index) => (
          <div 
            key={index}
            className={`rounded-2xl overflow-hidden transition-all duration-500 h-72 ${card.disabled ? 'opacity-70' : ''}`}
            style={neuCardStyle}
          >
            <div className={`h-1/3 bg-gradient-to-br ${card.color} flex items-center justify-center`}>
              <span className="text-5xl">{card.icon}</span>
            </div>
            <div className="p-6 h-2/3 flex flex-col justify-between">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${card.textColor}`}>
                  {card.title}
                </h3>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                  {card.description}
                </p>
              </div>
              <div 
                className={`self-start px-6 py-2 rounded-full text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} font-medium`}
              >
                Próximamente
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 