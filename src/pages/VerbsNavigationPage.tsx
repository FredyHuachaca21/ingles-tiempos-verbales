import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export const VerbsNavigationPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

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

  // Datos de las tarjetas para navegación de verbos
  const verbCards = [
    {
      title: "Lista de Verbos",
      description: "Consulta los verbos regulares e irregulares en inglés",
      color: theme === 'light' ? "from-blue-200 to-blue-100" : "from-blue-900/30 to-blue-800/30",
      textColor: theme === 'light' ? "text-blue-900" : "text-blue-300",
      action: () => navigate('/verbs/list'),
      icon: "📋"
    },
    {
      title: "Tarjetas de Estudio",
      description: "Estudia los verbos con flashcards interactivas",
      color: theme === 'light' ? "from-green-200 to-green-100" : "from-green-900/30 to-green-800/30",
      textColor: theme === 'light' ? "text-green-900" : "text-green-300",
      action: () => navigate('/verbs/flashcards'),
      icon: "🔄"
    },
    {
      title: "Conjugación",
      description: "Aprende cómo conjugar verbos en todos los tiempos verbales",
      color: theme === 'light' ? "from-amber-200 to-amber-100" : "from-amber-900/30 to-amber-800/30",
      textColor: theme === 'light' ? "text-amber-900" : "text-amber-300",
      action: () => navigate('/verbs/conjugation'),
      icon: "📝"
    },
    {
      title: "Patrones Verbales",
      description: "Explora los diferentes patrones que siguen los verbos irregulares",
      color: theme === 'light' ? "from-indigo-200 to-indigo-100" : "from-indigo-900/30 to-indigo-800/30",
      textColor: theme === 'light' ? "text-indigo-900" : "text-indigo-300",
      action: () => navigate('/verbs/patterns'),
      icon: "🔍"
    }
  ];

  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
      <div className="text-center mb-12">
        <h1 
          className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6`}
          style={{
            textShadow: theme === 'light' 
              ? '2px 2px 4px rgba(0,0,0,0.1)' 
              : '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Sección de Verbos
        </h1>
        <p className={`text-lg sm:text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Explora todas las herramientas disponibles para aprender verbos en inglés
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {verbCards.map((card, index) => (
          <div 
            key={index}
            className="rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer h-80 sm:h-96"
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
              <span className="text-5xl sm:text-6xl">{card.icon}</span>
            </div>
            <div className="p-4 sm:p-6 h-2/3 flex flex-col justify-between">
              <div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${card.textColor}`}>
                  {card.title}
                </h3>
                <p className={`text-sm sm:text-base ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {card.description}
                </p>
              </div>
              <div 
                className={`self-start px-4 sm:px-6 py-2 sm:py-3 rounded-full ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} font-medium text-sm sm:text-base`}
                style={neuButtonStyle}
              >
                Explorar
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => navigate('/')}
          className={`px-6 py-3 rounded-full transition-all duration-300 ${
            theme === 'light' 
              ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
              : 'bg-blue-900/20 text-blue-300 hover:bg-blue-900/30'
          }`}
          style={neuButtonStyle}
        >
          ← Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default VerbsNavigationPage; 