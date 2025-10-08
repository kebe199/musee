import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './pages/Home';
import WorkDetail from './pages/WorkDetail';
import LanguageSelector from './components/LanguageSelector';
import './App.css';
import ScanQR from './pages/ScanQR';
import About from './pages/About';
import Admin from './pages/Admin';
import ScrollToTop from './ScrollToTop';

function App() {
  const [lang, setLang] = useState('fr');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pageBg = `${process.env.PUBLIC_URL}/img/museum-page.jpg`;

  return (
    <Router>
      <ScrollToTop />
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
            <div className="header-logo-title">
              <img
                src={process.env.PUBLIC_URL + "/img/logo_MCN.png"}
                alt="Logo Musée des Civilisations Noires"
                className="logo-mcn"
                style={{ height: 48, width: 48, marginRight: 14, verticalAlign: 'middle' }}
              />
              <h1 className="scrolling-title">
                <span> Musée des Civilisations Noires</span>
              </h1>
            </div>
            <nav className="header-nav desktop-only">
              <Link to="/" className="nav-link">Collection</Link>
              <Link to="/scan" className="nav-link">Scanner QR</Link>
              <Link to="/about" className="nav-link">À propos</Link> {/* Nouveau bouton */}
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
            <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Collection</Link>
            <Link to="/scan" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Scanner QR</Link>
            <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>À propos</Link> {/* Nouveau bouton */}
          </nav>
          <div className="mobile-lang">
            <LanguageSelector lang={lang} setLang={(l) => { setLang(l); setIsMobileMenuOpen(false); }} />
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/work/:id" element={<WorkDetail lang={lang} />} />
          <Route path="/scan" element={<ScanQR />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <section className="ad-section" aria-label="Publicités">
          <div className="ad-viewport">
            <div className="ad-track">
              <div className="ad-item"><img src="/img/ad-1.jpg" alt="Publicité 1" /></div>
              <div className="ad-item"><img src="/img/ad-2.jpg" alt="Publicité 2" /></div>
              <div className="ad-item"><img src="/img/ad-3.jpg" alt="Publicité 3" /></div>
              {/* duplicates for seamless loop */}
              <div className="ad-item"><img src="/img/ad-1.jpg" alt="" aria-hidden="true" /></div>
              <div className="ad-item"><img src="/img/ad-2.jpg" alt="" aria-hidden="true" /></div>
               <div className="ad-item"><img src="/img/ad-3.jpg" alt="" aria-hidden="true" /></div>
            </div>
          </div>
        </section>

        <footer className="app-footer">
          <img
            src={process.env.PUBLIC_URL + "/img/logo_MCN.png"}
            alt="Logo Musée des Civilisations Noires"
            className="logo-mcn-footer"
            style={{ height: 38, width: 38, marginRight: 10, verticalAlign: 'middle' }}
          />
          <span>&copy; {new Date().getFullYear()} Musée des Civilisations Noires</span>
          <span> | </span>
          <Link to="/about" className="footer-link">À propos</Link>
          <span> | </span>
          <Link to="/admin" className="footer-link" style={{marginLeft: 16, opacity: 0.7}}>Admin</Link>
        </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
