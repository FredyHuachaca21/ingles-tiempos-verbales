import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { ThemeProvider } from './context/ThemeProvider';
import { VerbTensesPage } from './pages/VerbTensesPage';
import { VerbTenseDetailPage } from './pages/VerbTenseDetailPage';
import { VerbsListPage } from './pages/VerbsListPage';
import { VerbsFlashcardsPage } from './pages/VerbsFlashcardsPage';
import { VerbConjugationPage } from './pages/VerbConjugationPage';
import { VerbPatternsPage } from './pages/VerbPatternsPage';
import { VerbsNavigationPage } from './pages/VerbsNavigationPage';

// Obtener el repositorio base para GitHub Pages
const getBasename = () => {
  // Solo usar la ruta del repositorio en producción
  if (import.meta.env.PROD) {
    return '/ingles-tiempos-verbales';
  }
  return '';
};

function App() {
  return (
    <ThemeProvider>
      <Router basename={getBasename()}>
        <MainLayout>
          <Routes>
            {/* Página de inicio */}
            <Route path="/" element={<HomePage />} />
            
            {/* Redirección para rutas base */}
            <Route path="/ingles-tiempos-verbales" element={<Navigate to="/" replace />} />
            <Route path="/ingles-tiempos-verbales/*" element={<Navigate to="/" replace />} />
            
            {/* Rutas existentes */}
            <Route path="/tenses" element={<VerbTensesPage />} />
            <Route path="/tenses/:id" element={<VerbTenseDetailPage />} />
            <Route path="/verbs" element={<VerbsNavigationPage />} />
            <Route path="/verbs/list" element={<VerbsListPage />} />
            <Route path="/verbs/flashcards" element={<VerbsFlashcardsPage />} />
            <Route path="/verbs/conjugation" element={<VerbConjugationPage />} />
            <Route path="/verbs/patterns" element={<VerbPatternsPage />} />
            
            {/* Redirección para rutas no encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
