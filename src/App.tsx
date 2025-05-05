import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { ThemeProvider } from './context/ThemeProvider';
import { VerbTensesPage } from './pages/VerbTensesPage';
import { VerbTenseDetailPage } from './pages/VerbTenseDetailPage';
import { VerbsListPage } from './pages/VerbsListPage';
import { VerbsFlashcardsPage } from './pages/VerbsFlashcardsPage';
import { VerbConjugationPage } from './pages/VerbConjugationPage';
import { VerbPatternsPage } from './pages/VerbPatternsPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tenses" element={<VerbTensesPage />} />
            <Route path="/tenses/:id" element={<VerbTenseDetailPage />} />
            <Route path="/verbs/list" element={<VerbsListPage />} />
            <Route path="/verbs/flashcards" element={<VerbsFlashcardsPage />} />
            <Route path="/verbs/conjugation" element={<VerbConjugationPage />} />
            <Route path="/verbs/patterns" element={<VerbPatternsPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
