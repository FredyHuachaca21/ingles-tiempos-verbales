import { useState } from 'react';
import { VerbTenseCard } from './VerbTenseCard';
import verbTensesData from '../../data/verbTensesData';
import { useTheme } from '../../hooks/useTheme';

export const VerbTensesGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'present' | 'past' | 'future'>('all');
  const { theme } = useTheme();
  
  const filteredTenses = selectedCategory === 'all' 
    ? verbTensesData 
    : verbTensesData.filter(tense => tense.category === selectedCategory);
  
  return (
    <div className="w-full py-4">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          Los 12 Tiempos Verbales en Inglés
        </h1>
        <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Selecciona un tiempo verbal para ver todos los detalles sobre su estructura, usos y ejemplos.
        </p>
        
        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2 rounded-full text-base font-medium transition-all duration-300 ${
              selectedCategory === 'all' 
                ? (theme === 'light' 
                  ? 'bg-gray-200 text-gray-800 shadow-inner' 
                  : 'bg-gray-700 text-white shadow-inner')
                : (theme === 'light'
                  ? 'bg-white text-gray-700 hover:text-gray-900'
                  : 'bg-gray-800 text-gray-300 hover:text-white')
            }`}
            style={{
              boxShadow: selectedCategory === 'all'
                ? (theme === 'light'
                  ? 'inset 3px 3px 6px rgba(0,0,0,0.1), inset -3px -3px 6px rgba(255,255,255,0.7)'
                  : 'inset 3px 3px 6px rgba(0,0,0,0.2)')
                : (theme === 'light'
                  ? '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)'
                  : '3px 3px 6px rgba(0,0,0,0.2)')
            }}
          >
            Todos
          </button>
          
          <button
            onClick={() => setSelectedCategory('present')}
            className={`px-5 py-2 rounded-full text-base font-medium transition-all duration-300 ${
              selectedCategory === 'present' 
                ? (theme === 'light' 
                  ? 'bg-green-100 text-green-800 shadow-inner' 
                  : 'bg-green-900/40 text-green-100 shadow-inner')
                : (theme === 'light'
                  ? 'bg-white text-green-700 hover:text-green-900'
                  : 'bg-gray-800 text-green-300 hover:text-green-100')
            }`}
            style={{
              boxShadow: selectedCategory === 'present'
                ? (theme === 'light'
                  ? 'inset 3px 3px 6px rgba(0,0,0,0.1), inset -3px -3px 6px rgba(255,255,255,0.7)'
                  : 'inset 3px 3px 6px rgba(0,0,0,0.2)')
                : (theme === 'light'
                  ? '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)'
                  : '3px 3px 6px rgba(0,0,0,0.2)')
            }}
          >
            Presente
          </button>
          
          <button
            onClick={() => setSelectedCategory('past')}
            className={`px-5 py-2 rounded-full text-base font-medium transition-all duration-300 ${
              selectedCategory === 'past' 
                ? (theme === 'light' 
                  ? 'bg-blue-100 text-blue-800 shadow-inner' 
                  : 'bg-blue-900/40 text-blue-100 shadow-inner')
                : (theme === 'light'
                  ? 'bg-white text-blue-700 hover:text-blue-900'
                  : 'bg-gray-800 text-blue-300 hover:text-blue-100')
            }`}
            style={{
              boxShadow: selectedCategory === 'past'
                ? (theme === 'light'
                  ? 'inset 3px 3px 6px rgba(0,0,0,0.1), inset -3px -3px 6px rgba(255,255,255,0.7)'
                  : 'inset 3px 3px 6px rgba(0,0,0,0.2)')
                : (theme === 'light'
                  ? '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)'
                  : '3px 3px 6px rgba(0,0,0,0.2)')
            }}
          >
            Pasado
          </button>
          
          <button
            onClick={() => setSelectedCategory('future')}
            className={`px-5 py-2 rounded-full text-base font-medium transition-all duration-300 ${
              selectedCategory === 'future' 
                ? (theme === 'light' 
                  ? 'bg-pink-100 text-pink-800 shadow-inner' 
                  : 'bg-pink-900/40 text-pink-100 shadow-inner')
                : (theme === 'light'
                  ? 'bg-white text-pink-700 hover:text-pink-900'
                  : 'bg-gray-800 text-pink-300 hover:text-pink-100')
            }`}
            style={{
              boxShadow: selectedCategory === 'future'
                ? (theme === 'light'
                  ? 'inset 3px 3px 6px rgba(0,0,0,0.1), inset -3px -3px 6px rgba(255,255,255,0.7)'
                  : 'inset 3px 3px 6px rgba(0,0,0,0.2)')
                : (theme === 'light'
                  ? '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)'
                  : '3px 3px 6px rgba(0,0,0,0.2)')
            }}
          >
            Futuro
          </button>
        </div>
      </div>
      
      {/* Cuadrícula de tarjetas de tiempos verbales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTenses.map(tense => (
          <div key={tense.id} className="h-full">
            <VerbTenseCard 
              id={tense.id}
              name={tense.name}
              nameEs={tense.nameEs}
              shortDesc={tense.shortDesc}
              category={tense.category}
              path={tense.path}
            />
          </div>
        ))}
      </div>
    </div>
  );
}; 