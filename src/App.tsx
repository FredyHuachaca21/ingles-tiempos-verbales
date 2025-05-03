import './App.css';
import { MarkmapSelector } from './components/MarkmapSelector';
import './components/Markmap.css';

function App() {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>Mapas Mentales de Tiempos Verbales en Inglés</h1>
        <p>Visualiza los diferentes tiempos verbales en inglés usando mapas mentales</p>
      </header>
      
      <main className="app-content">
        <MarkmapSelector />
      </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} - Tiempos Verbales en Inglés</p>
      </footer>
    </div>
  );
}

export default App;
