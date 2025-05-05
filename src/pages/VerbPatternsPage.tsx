import { VerbPatternGrid } from '../components/verbs/VerbPatternGrid';

export const VerbPatternsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Patrones de Verbos Irregulares en Inglés
      </h1>
      
      <div className="max-w-3xl mx-auto mb-8 text-center text-gray-600">
        <p>
          Los verbos irregulares en inglés siguen ciertos patrones que pueden ayudarte a memorizarlos.
          Aprender estos patrones te permitirá recordar más fácilmente las distintas formas verbales.
        </p>
      </div>
      
      <VerbPatternGrid />
      
      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Consejos para Memorizar Verbos Irregulares</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ol className="list-decimal pl-6 space-y-3">
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
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
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