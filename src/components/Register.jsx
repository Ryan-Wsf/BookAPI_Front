import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { email, password });
      localStorage.setItem('token', response.data.token);
      onRegister();
    } catch (error) {
      console.error('Erreur d\'inscription', error);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;