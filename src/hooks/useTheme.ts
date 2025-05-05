import { useContext } from 'react';
import { ThemeContext, THEME_CHANGE_EVENT } from '../context/ThemeProvider';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  
  return context;
};

// Exportar el evento para que componentes externos puedan suscribirse
export { THEME_CHANGE_EVENT }; 