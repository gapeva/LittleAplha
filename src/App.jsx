import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('LANDING');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
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
          onNavigateSignup={() => setCurrentPage('SIGNUP')}
        />
      )}

      {currentPage === 'LOGIN' && (
        <Login 
          onSuccess={handleLoginSuccess} 
          onBack={() => setCurrentPage('LANDING')} 
        />
      )}

      {currentPage === 'DASHBOARD' && isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : currentPage === 'DASHBOARD' && (
        // Redirect to landing if user tries to reach dashboard without token
        <Landing onNavigateLogin={() => setCurrentPage('LOGIN')} />
      )}

      {currentPage === 'SIGNUP' && (
        <div className="p-10 text-center">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Registration</h2>
          <p className="text-slate-500 mb-6">Create a copy of Login.jsx to build this route.</p>
          <button onClick={() => setCurrentPage('LANDING')} className="text-biotech-blue font-bold">Return Home</button>
        </div>
      )}
    </div>
  );
}

export default App;
