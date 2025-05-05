import { VerbPatternGrid } from '../components/verbs/VerbPatternGrid';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

export const VerbPatternsPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // Estilos neumórficos para botones
  const neuButtonStyle = {
    backgroundColor: theme === 'light' ? '#f0f0f3' : '#2a2a2e',
    boxShadow: theme === 'light' 
      ? '5px 5px 10px rgba(174, 174, 192, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.8)' 
      : '5px 5px 10px rgba(0, 0, 0, 0.6), -5px -5px 10px rgba(75, 75, 90, 0.3)',
    transition: 'all 0.2s ease'
  };
  
  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/verbs')}
          className={`px-4 py-2 rounded-full transition-all duration-300 text-sm sm:text-base font-medium flex items-center ${
            theme === 'light' 
              ? 'text-gray-700 hover:text-gray-900' 
              : 'text-gray-200 hover:text-white'
          }`}
          style={neuButtonStyle}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver
        </button>
        
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Patrones Verbales
        </h1>
        
        <div className="w-10"></div> {/* Spacer para centrar el título */}
      </div>
      
      <div className={`max-w-3xl mx-auto mb-8 text-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
        <p>
          Los verbos irregulares en inglés siguen ciertos patrones que pueden ayudarte a memorizarlos.
          Aprender estos patrones te permitirá recordar más fácilmente las distintas formas verbales.
        </p>
      </div>
      
      <VerbPatternGrid />
      
      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Consejos para Memorizar Verbos Irregulares
        </h2>
        
        <div className={`p-6 rounded-lg shadow-md ${
          theme === 'light' 
            ? 'bg-white' 
            : 'bg-gray-800'
        }`}>
          <ol className={`list-decimal pl-6 space-y-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            <li>
              <span className="font-medium">Agrupa verbos por patrones similares</span>: En lugar de memorizar verbos individuales,
              busca similitudes en sus formas y agrupálos por patrones (como se muestra arriba).
            </li>
            <li>
              <span className="font-medium">Usar tarjetas de estudio</span>: Crea tarjetas de estudio con el infinitivo en un lado y las 
              otras formas en el otro. Puedes usar nuestra sección de tarjetas para esto.
            </li>
            <li>
              <span className="font-medium">Práctica con oraciones completas</span>: Utiliza cada verbo en oraciones completas para
              reforzar su uso en contexto.
            </li>
            <li>
              <span className="font-medium">Escucha y repite</span>: Escucha la pronunciación correcta y repite en voz alta para
              memorizar de forma auditiva.
            </li>
            <li>
              <span className="font-medium">Revisa con frecuencia</span>: Vuelve a revisar los verbos regularmente para reforzar
              tu memoria a largo plazo.
            </li>
          </ol>
          
          <div className={`mt-6 p-4 rounded-lg ${
            theme === 'light' 
              ? 'bg-blue-50' 
              : 'bg-blue-900/20'
          }`}>
            <p className={theme === 'light' ? 'text-blue-800' : 'text-blue-300'}>
              <strong>Recuerda</strong>: La clave para dominar los verbos irregulares es la exposición constante y 
              la práctica regular. No intentes memorizar todos a la vez. Es más efectivo aprender pocos verbos por día
              y revisarlos constantemente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerbPatternsPage; 