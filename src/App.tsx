import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { ThemeProvider } from './context/ThemeProvider';
import { VerbTensesPage } from './pages/VerbTensesPage';
import { VerbTenseDetailPage } from './pages/VerbTenseDetailPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tenses" element={<VerbTensesPage />} />
            <Route path="/tenses/:id" element={<VerbTenseDetailPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
