import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Función para establecer el tema inicial según localStorage o preferencias del sistema
function setInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Determinar el tema inicial
  let initialTheme;
  if (savedTheme === 'dark' || savedTheme === 'light') {
    initialTheme = savedTheme;
  } else {
    initialTheme = systemPrefersDark ? 'dark' : 'light';
    // Guardar la preferencia del sistema
    localStorage.setItem('theme', initialTheme);
  }
  
  // Aplicar el tema inicial al DOM antes de que React se monte
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark-mode');
    document.body.style.backgroundColor = '#111827';
    document.body.style.color = '#e5e7eb';
  } else {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark-mode');
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#1f2937';
  }
  
  console.log(`Theme initialized as: ${initialTheme}`);
}

// Aplicar tema antes del renderizado para evitar parpadeo
setInitialTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
