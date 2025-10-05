import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkDetail from './pages/WorkDetail';
import LanguageSelector from './components/LanguageSelector';
import './App.css';
import ScanQR from './pages/ScanQR';

function App() {
  const [lang, setLang] = useState('fr');
  const pageBg = `${process.env.PUBLIC_URL}/img/museum-page.jpg`;

  return (
    <Router>
      <div
        className="container"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.25) 100%), url(${pageBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <header>
          <div className="header-left">
            <h1>🎨 Musée des Civilisations Noires</h1>
            <nav className="header-nav">
              <a href="/" className="nav-link">Collection</a>
              <a href="/scan" className="nav-link">Scanner QR</a>
            </nav>
          </div>
          <LanguageSelector lang={lang} setLang={setLang} />
        </header>

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
    </Router>
  );
}

export default App;
