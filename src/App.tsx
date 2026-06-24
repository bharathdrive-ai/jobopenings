import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { ExamProvider } from './context/ExamContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/ToastContainer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CertDetailPage } from './pages/CertDetailPage';
import { ExamPage } from './pages/ExamPage';
import { ResultsPage } from './pages/ResultsPage';
import { DashboardPage } from './pages/DashboardPage';

function AppContent() {
  const { darkMode, toasts } = useUser();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/cert/:id" element={<CertDetailPage />} />
          <Route path="/exam/:id" element={<ExamPage />} />
          <Route path="/results/:sessionId" element={<ResultsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <ExamProvider>
        <AppContent />
      </ExamProvider>
    </UserProvider>
  );
}
