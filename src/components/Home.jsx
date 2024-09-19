import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="home-container">
    <h1>Bienvenue sur la Bibliothèque</h1>
    <nav className="home-nav">
      <Link to="/login" className="nav-button">Se connecter</Link>
      <Link to="/register" className="nav-button">S'inscrire</Link>
    </nav>
  </div>
);

export default Home;