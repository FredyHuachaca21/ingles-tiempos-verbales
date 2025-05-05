import { ReactNode, useState, useCallback, useEffect, createContext } from 'react';

// Definir el tipo de tema
type Theme = 'light' | 'dark';

// Crear un contexto para el tema
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Evento personalizado para notificar cambios de tema
export const THEME_CHANGE_EVENT = 'theme-changed';

// Exportar el contexto para que useTheme pueda usarlo
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Estado inicial desde localStorage
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    
    // Leer directamente del localStorage para asegurar consistencia
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    return (storedTheme === 'light' || storedTheme === 'dark') 
      ? storedTheme 
      : 'light'; // Valor por defecto
  });
  
  // Función para aplicar cambios visuales al DOM
  const applyThemeToDOM = useCallback((newTheme: Theme) => {
    if (typeof document === 'undefined') return;
    
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    // Actualizar clases
    if (newTheme === 'dark') {
      htmlElement.classList.add('dark');
      bodyElement.classList.add('dark-mode');
    } else {
      htmlElement.classList.remove('dark');
      bodyElement.classList.remove('dark-mode');
    }
    
    // Actualizar estilos inline para forzar cambio visual inmediato
    if (newTheme === 'dark') {
      bodyElement.style.backgroundColor = '#111827';
      bodyElement.style.color = '#e5e7eb';
    } else {
      bodyElement.style.backgroundColor = '#ffffff';
      bodyElement.style.color = '#1f2937';
    }
    
    // Forzar reflow para que los cambios se apliquen inmediatamente
    void document.documentElement.offsetHeight;
    
    // Disparar evento personalizado para notificar a componentes especiales como MarkmapViewer
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme: newTheme } }));
    
    console.log(`Applied theme: ${newTheme}, dark class present: ${htmlElement.classList.contains('dark')}`);
  }, []);
  
  // Función para cambiar el tema
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      
      // Guardar en localStorage
      localStorage.setItem('theme', newTheme);
      
      // Aplicar cambios visuales inmediatamente
      applyThemeToDOM(newTheme);
      
      // Añadir transición visual
      document.body.classList.add('theme-transition');
      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 700);
      
      return newTheme;
    });
  }, [applyThemeToDOM]);
  
  // Aplicar tema al montar el componente
  useEffect(() => {
    // Aplicar el tema actual al DOM
    applyThemeToDOM(theme);
  }, [theme, applyThemeToDOM]);
  
  // Escuchar cambios en las preferencias del sistema
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        applyThemeToDOM(newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [applyThemeToDOM]);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 