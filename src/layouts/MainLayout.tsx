import { ReactNode, useEffect } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { useTheme } from '../hooks/useTheme';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { theme } = useTheme();

  // Forzar actualización del tema en el documento
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      document.body.classList.add('dark-mode');
      
      // Forzar estilos inline en HTML y body
      document.body.style.backgroundColor = '#121826';
      document.body.style.color = '#e5e7eb';
    } else {
      htmlElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
      
      // Forzar estilos inline en HTML y body
      document.body.style.backgroundColor = '#f5f7fa';
      document.body.style.color = '#374151';
    }
    
    // Forzar reflow para actualización inmediata
    void document.documentElement.offsetHeight;
    
    console.log(`MainLayout aplicando tema: ${theme}, dark presente: ${htmlElement.classList.contains('dark')}`);
  }, [theme]);

  return (
    <div 
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#121826' : '#f5f7fa',
        color: theme === 'dark' ? '#e5e7eb' : '#374151'
      }}
    >
      <Navbar />
      
      <main 
        className="flex-grow py-8 px-4 container mx-auto max-w-6xl"
        style={{
          color: theme === 'dark' ? '#e5e7eb' : '#374151'
        }}
      >
        {children}
      </main>
      
      <Footer />
    </div>
  );
}; 