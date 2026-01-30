import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('LANDING');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // If we have a token, we usually go to dashboard, 
      // but let's default to Landing if it's a fresh load so they see the branding,
      // unless they are explicitly trying to access the app.
      // For MVP simplicity:
      setCurrentPage('DASHBOARD');
    }
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setCurrentPage('DASHBOARD');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setCurrentPage('LANDING');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {currentPage === 'LANDING' && (
        <Landing 
          onNavigateLogin={() => setCurrentPage('LOGIN')} 
        />
      )}

      {currentPage === 'LOGIN' && (
        <Login 
          onSuccess={handleLoginSuccess} 
          onBack={() => setCurrentPage('LANDING')} 
          onNavigateSignup={() => setCurrentPage('SIGNUP')}
        />
      )}

      {currentPage === 'SIGNUP' && (
        <Signup 
          onNavigateLogin={() => setCurrentPage('LOGIN')}
        />
      )}

      {currentPage === 'DASHBOARD' && isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : currentPage === 'DASHBOARD' && (
        <Landing onNavigateLogin={() => setCurrentPage('LOGIN')} />
      )}
    </div>
  );
}

export default App;
