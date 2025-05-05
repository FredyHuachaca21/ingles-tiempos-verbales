import { useTheme } from '../../hooks/useTheme';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Solo renderizar después del primer montaje para evitar incompatibilidades SSR
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Manejar el clic en el botón
  const handleClick = () => {
    toggleTheme();
    // Añadir feedback visual para el usuario
    document.body.classList.add('theme-transition');
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 1000);
  };
  
  // Renderizar un placeholder durante el montaje
  if (!mounted) return (
    <button className="p-2 rounded-full w-10 h-10 flex items-center justify-center">
      <div className="w-5 h-5"></div>
    </button>
  );
  
  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 ${
        theme === 'light' 
          ? 'bg-gray-50 text-gray-600 hover:text-gray-900' 
          : 'bg-gray-700 text-gray-300 hover:text-white'
      }`}
      style={{
        boxShadow: theme === 'light' 
          ? '3px 3px 6px rgba(0,0,0,0.1), -3px -3px 6px rgba(255,255,255,0.7)' 
          : '3px 3px 6px rgba(0,0,0,0.2)'
      }}
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {/* Ícono de sol para el modo oscuro */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-5 h-5 transition-transform duration-300 ${theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`}
        style={{ display: theme === 'dark' ? 'block' : 'none' }}
      >
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
      </svg>
      
      {/* Ícono de luna para el modo claro */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-5 h-5 transition-transform duration-300 ${theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`}
        style={{ display: theme === 'light' ? 'block' : 'none' }}
      >
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
      </svg>
    </button>
  );
}; 