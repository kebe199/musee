import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../auth';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    try {
      await signup(email, password);
      // Rediriger vers login avec message de succès et préremplissage email
      navigate('/login', { replace: true, state: { signupSuccess: true, email } });
    } catch (err) {
      setError(err.message || "Inscription échouée");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Créer un compte</h1>
        <p>Inscrivez-vous pour accéder à la page d'accueil.</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <label className="form-label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="vous@exemple.com"
              required
            />
          </label>
          <label className="form-label">
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••"
              required
              minLength={4}
            />
          </label>
          <label className="form-label">
            Confirmer le mot de passe
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="form-input"
              placeholder="••••"
              required
              minLength={4}
            />
          </label>
          {error && <div className="error error-inline">{error}</div>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Création…' : "S'inscrire"}
          </button>
        </form>
        <div className="signup-footer">
          <span>Déjà un compte ? </span>
          <Link to="/login" className="link">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
