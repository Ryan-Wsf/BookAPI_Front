import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import BookManagement from './components/BookManagement';
import './styles/App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && (
          <nav className="nav-bar">
            <button onClick={handleLogout} className="logout-button">Déconnexion</button>
          </nav>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/books" replace /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/books" replace /> : <Register onRegister={handleLogin} />
          } />
          <Route path="/books" element={
            isAuthenticated ? <BookManagement /> : <Navigate to="/" replace />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;