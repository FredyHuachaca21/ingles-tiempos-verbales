import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

interface VerbTenseCardProps {
  id: string;
  name: string;
  nameEs: string;
  shortDesc: string;
  category: 'present' | 'past' | 'future';
  path: string;
}

export const VerbTenseCard = ({ id, name, nameEs, shortDesc, category, path }: VerbTenseCardProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  // Colores específicos para cada categoría
  const getCategoryColor = () => {
    switch(category) {
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
  
  const getCategoryBgClass = () => {
    switch(category) {
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
    <div 
      className={`rounded-xl overflow-hidden transition-all duration-300 cursor-pointer h-full ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800'
      }`}
      style={{
        boxShadow: theme === 'light' 
          ? '8px 8px 16px rgba(0,0,0,0.05), -8px -8px 16px rgba(255,255,255,0.8)' 
          : '8px 8px 16px rgba(0,0,0,0.1)',
      }}
      onClick={() => navigate(path)}
    >
      <div 
        className={`p-1 ${getCategoryBgClass()}`}
        style={{ borderBottom: `3px solid ${getCategoryColor()}` }}
      />
      
      <div className="p-6">
        <h3 
          className={`text-lg font-bold mb-1 ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}
        >
          {name}
        </h3>
        <h4 
          className={`text-base mb-4 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}
          style={{ color: getCategoryColor() }}
        >
          {nameEs}
        </h4>
        <p 
          className={`text-sm ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}
        >
          {shortDesc}
        </p>
      </div>
    </div>
  );
}; 