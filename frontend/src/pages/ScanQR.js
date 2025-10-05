import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const translations = {
  fr: {
    title: "Scanner QR Code",
    subtitle: "Scannez le QR code d'une œuvre pour découvrir ses secrets",
    instructions: "Placez le QR code dans le cadre ci-dessous",
    scanButton: "Scanner QR Code",
    manualEntry: "Saisie manuelle",
    enterId: "Entrez l'ID de l'œuvre",
    goToWork: "Voir l'œuvre",
    back: "← Retour",
    error: "Erreur lors du scan",
    notFound: "Œuvre non trouvée"
  },
  en: {
    title: "Scan QR Code",
    subtitle: "Scan a QR code to discover artwork secrets",
    instructions: "Place the QR code in the frame below",
    scanButton: "Scan QR Code",
    manualEntry: "Manual entry",
    enterId: "Enter artwork ID",
    goToWork: "View artwork",
    back: "← Back",
    error: "Scan error",
    notFound: "Artwork not found"
  },
  wo: {
    title: "Jëfandikoo QR Code",
    subtitle: "Jëfandikoo QR code ngir gis jëmmiinu",
    instructions: "Dëkk QR code bi ci ndimbalu",
    scanButton: "Jëfandikoo QR Code",
    manualEntry: "Jëfandikoo ak loxo",
    enterId: "Tollu ID bi ci jëmmiinu",
    goToWork: "Gis jëmmiinu",
    back: "← Dellu",
    error: "Jàppal ci jëfandikoo",
    notFound: "Jëmmiinu gisul"
  }
};

export default function ScanQR() {
  const [manualId, setManualId] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [lang, setLang] = useState('fr'); // You might want to get this from context

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualId.trim()) {
      navigate(`/work/${manualId.trim()}`);
    } else {
      setError(translations[lang].notFound);
    }
  };

  const handleQRScan = () => {
    // This would integrate with a QR scanner library
    // For now, we'll show a placeholder
    alert(translations[lang].instructions);
  };

  return (
    <div className="scan-page">
      <div className="scan-header">
        <h1>{translations[lang].title}</h1>
        <p className="subtitle">{translations[lang].subtitle}</p>
      </div>

      <div className="scan-content">
        <div className="qr-scanner-section">
          <div className="qr-placeholder">
            <div className="qr-frame">
              <div className="qr-corners">
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
              </div>
              <p>{translations[lang].instructions}</p>
            </div>
          </div>
          <button onClick={handleQRScan} className="scan-button">
            {translations[lang].scanButton}
          </button>
        </div>

        <div className="divider">
          <span>ou</span>
        </div>

        <div className="manual-entry-section">
          <button 
            onClick={() => setShowManual(!showManual)}
            className="toggle-manual"
          >
            {translations[lang].manualEntry}
          </button>
          
          {showManual && (
            <form onSubmit={handleManualSubmit} className="manual-form">
              <label htmlFor="workId">{translations[lang].enterId}</label>
              <input
                type="text"
                id="workId"
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                placeholder="Ex: 1, 2, 3..."
                className="id-input"
              />
              <button type="submit" className="submit-button">
                {translations[lang].goToWork}
              </button>
            </form>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="scan-footer">
        <button onClick={() => navigate('/')} className="back-button">
          {translations[lang].back}
        </button>
      </div>
    </div>
  );
}
