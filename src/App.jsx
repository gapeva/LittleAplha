import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  // Track if the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Track which page we are on (Landing, Login, or Dashboard)
  const [currentPage, setCurrentPage] = useState('LANDING');

  // Check for existing login on startup
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

  // Simple Router Logic
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
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

      {currentPage === 'DASHBOARD' && isAuthenticated && (
        <Dashboard onLogout={handleLogout} />
      )}
      
      {/* Fallback for Signup (can be built as a copy of Login) */}
      {currentPage === 'SIGNUP' && (
        <div className="p-10 text-center">
          <h2 className="text-2xl font-bold">Registration</h2>
          <p className="mb-4">Feature coming in next commit.</p>
          <button onClick={() => setCurrentPage('LANDING')} className="text-biotech-blue underline">Back</button>
        </div>
      )}
    </div>
  );
}

export default App;
