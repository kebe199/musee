import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkDetail from './pages/WorkDetail';
import LanguageSelector from './components/LanguageSelector';
import './App.css';
import ScanQR from './pages/ScanQR';

function App() {
  const [lang, setLang] = useState('fr');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pageBg = `${process.env.PUBLIC_URL}/img/museum-page.jpg`;

  return (
    <Router>
      <div
        className="app-shell"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.25) 100%), url(${pageBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container">
        <header>
          <div className="header-left">
            <button
              className="hamburger mobile-only"
              aria-label="Ouvrir le menu"
              aria-controls="mobile-drawer"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(v => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <h1>🎨 Musée des Civilisations Noires</h1>
            <nav className="header-nav desktop-only">
              <a href="/" className="nav-link">Collection</a>
              <a href="/scan" className="nav-link">Scanner QR</a>
            </nav>
          </div>
          <div className="desktop-only">
            <LanguageSelector lang={lang} setLang={setLang} />
          </div>
        </header>

        {/* Backdrop pour fermer le tiroir */}
        <div
          className={`backdrop ${isMobileMenuOpen ? 'show' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden={!isMobileMenuOpen}
        />
        {/* Tiroir latéral gauche */}
        <div
          id="mobile-drawer"
          className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
        >
          <nav className="mobile-nav">
            <a href="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Collection</a>
            <a href="/scan" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Scanner QR</a>
          </nav>
          <div className="mobile-lang">
            <LanguageSelector lang={lang} setLang={(l) => { setLang(l); setIsMobileMenuOpen(false); }} />
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/work/:id" element={<WorkDetail lang={lang} />} />
          <Route path="/scan" element={<ScanQR />} />
        </Routes>

        <section className="ad-section" aria-label="Publicités">
          <div className="ad-viewport">
            <div className="ad-track">
              <div className="ad-item"><img src="/img/ad-1.jpg" alt="Publicité 1" /></div>
              <div className="ad-item"><img src="/img/ad-2.jpg" alt="Publicité 2" /></div>
              {/* duplicates for seamless loop */}
              <div className="ad-item"><img src="/img/ad-1.jpg" alt="" aria-hidden="true" /></div>
              <div className="ad-item"><img src="/img/ad-2.jpg" alt="" aria-hidden="true" /></div>
            </div>
          </div>
        </section>

        <footer>
          <p>© 2025 Musée des Civilisations Noires - Hackathon Digitalisation</p>
        </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
