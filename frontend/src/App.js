import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkDetail from './pages/WorkDetail';
import LanguageSelector from './components/LanguageSelector';
import './App.css';
import ScanQR from './pages/ScanQR';

function App() {
  const [lang, setLang] = useState('fr');

  return (
    <Router>
      <div className="container">
        <header>
          <h1>🎨 Musée des Civilisations Noires</h1>
          <LanguageSelector lang={lang} setLang={setLang} />
        </header>

        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/work/:id" element={<WorkDetail lang={lang} />} />
          <Route path="/scan" element={<ScanQR />} />
        </Routes>

        <footer>
          <p>© 2025 Musée des Civilisations Noires - Hackathon Digitalisation</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
