import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../../hooks/useTheme';

interface NavbarProps {
  title?: string;
}

export const Navbar = ({ title = 'Tiempos Verbales en Inglés' }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  
  return (
    <nav 
      className={`${
        theme === 'light' 
          ? 'bg-gray-50 text-gray-800' 
          : 'bg-gray-800 text-gray-100'
      } shadow-sm transition-colors duration-300`}
      style={{
        boxShadow: theme === 'light' 
          ? '0px 3px 15px rgba(0,0,0,0.05), 0px 2px 4px rgba(0,0,0,0.05)' 
          : '0px 3px 15px rgba(0,0,0,0.2)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>
                {title}
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                theme === 'light' 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Inicio
            </Link>
            <Link 
              to="/tenses" 
              className={`px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                theme === 'light' 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Tiempos Verbales
            </Link>
            <Link 
              to="/regulares" 
              className={`py-2 px-3 rounded-md font-medium transition-all duration-300 ${
                theme === 'light' 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-200 hover:bg-gray-700'
              }`}
              style={{
                boxShadow: theme === 'light' ? 'inset 0 0 0 transparent' : 'inset 0 0 0 transparent',
              }}
              onMouseEnter={e => {
                if (theme === 'light') {
                  e.currentTarget.style.boxShadow = 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.8)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'inset 0 0 0 transparent';
              }}
            >
              Verbos Regulares
            </Link>
            <Link 
              to="/irregulares" 
              className={`py-2 px-3 rounded-md font-medium transition-all duration-300 ${
                theme === 'light' 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-200 hover:bg-gray-700'
              }`}
              style={{
                boxShadow: theme === 'light' ? 'inset 0 0 0 transparent' : 'inset 0 0 0 transparent',
              }}
              onMouseEnter={e => {
                if (theme === 'light') {
                  e.currentTarget.style.boxShadow = 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.8)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'inset 0 0 0 transparent';
              }}
            >
              Verbos Irregulares
            </Link>
            <Link 
              to="/ejercicios" 
              className={`py-2 px-3 rounded-md font-medium transition-all duration-300 ${
                theme === 'light' 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-200 hover:bg-gray-700'
              }`}
              style={{
                boxShadow: theme === 'light' ? 'inset 0 0 0 transparent' : 'inset 0 0 0 transparent',
              }}
              onMouseEnter={e => {
                if (theme === 'light') {
                  e.currentTarget.style.boxShadow = 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.8)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'inset 0 0 0 transparent';
              }}
            >
              Ejercicios
            </Link>
            <ThemeToggle />
          </div>
          
          {/* Botón para móvil */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                theme === 'light' 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-200 hover:bg-gray-700'
              } transition-all duration-300`}
              aria-label="Abrir menú"
            >
              <svg
                className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 border-t ${
          theme === 'light' ? 'border-gray-200' : 'border-gray-700'
        }`}>
          <Link to="/" className={`block py-2 px-3 rounded-md font-medium transition-all duration-300 ${
            theme === 'light' 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-gray-200 hover:bg-gray-700'
          }`}>
            Inicio
          </Link>
          <Link to="/tenses" className={`block py-2 px-3 rounded-md font-medium transition-all duration-300 ${
            theme === 'light' 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-gray-200 hover:bg-gray-700'
          }`}>
            Tiempos Verbales
          </Link>
          <Link to="/regulares" className={`block py-2 px-3 rounded-md font-medium transition-all duration-300 ${
            theme === 'light' 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-gray-200 hover:bg-gray-700'
          }`}>
            Verbos Regulares
          </Link>
          <Link to="/irregulares" className={`block py-2 px-3 rounded-md font-medium transition-all duration-300 ${
            theme === 'light' 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-gray-200 hover:bg-gray-700'
          }`}>
            Verbos Irregulares
          </Link>
          <Link to="/ejercicios" className={`block py-2 px-3 rounded-md font-medium transition-all duration-300 ${
            theme === 'light' 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-gray-200 hover:bg-gray-700'
          }`}>
            Ejercicios
          </Link>
        </div>
      </div>
    </nav>
  );
}; 