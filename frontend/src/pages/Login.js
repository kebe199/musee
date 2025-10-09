import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
import { login, isAuthenticated, isAdmin } from '../auth';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [justSignedUp, setJustSignedUp] = useState(false);

  useEffect(() => {
    if (location && location.state) {
      if (location.state.email) setEmail(location.state.email);
      if (location.state.signupSuccess) setJustSignedUp(true);
    }
  }, [location]);

  if (isAuthenticated()) {
    return <Navigate to={isAdmin() ? "/admin" : "/"} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(isAdmin() ? '/admin' : '/', { replace: true });
    } catch (err) {
      setError(err.message || 'Échec de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Connexion</h1>
        <p>Connectez-vous pour accéder à la page d'accueil.</p>
        {justSignedUp && (
          <div className="notice">
            Compte créé avec succès. Vous pouvez maintenant vous connecter.
          </div>
        )}
        <form onSubmit={handleSubmit} className="login-form">
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
          {error && <div className="error error-inline">{error}</div>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
        <div className="login-footer">
          <span>Pas de compte ? </span>
          <Link to="/signup" className="link">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
}
