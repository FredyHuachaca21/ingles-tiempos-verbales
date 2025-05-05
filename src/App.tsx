import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { ThemeProvider } from './context/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Rutas adicionales pueden agregarse aquí */}
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
