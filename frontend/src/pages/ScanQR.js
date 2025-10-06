import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';

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
  const [errorDetails, setErrorDetails] = useState('');
  const navigate = useNavigate();
  const [lang] = useState('fr'); // You might want to get this from context
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const scannerRef = useRef(null);
  const html5QrcodeRef = useRef(null);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualId.trim()) {
      navigate(`/work/${manualId.trim()}`);
    } else {
      setError(translations[lang].notFound);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (html5QrcodeRef.current && isScanning) {
        html5QrcodeRef.current.stop().catch(() => {});
        html5QrcodeRef.current.clear().catch(() => {});
      }
    };
  }, [isScanning]);

  const stopScanning = async () => {
    try {
      if (html5QrcodeRef.current && isScanning) {
        await html5QrcodeRef.current.stop();
        await html5QrcodeRef.current.clear();
      }
    } catch (err) { 
      console.log('Scanner cleanup error (ignored):', err.message);
    }
    setIsScanning(false);
  };

  const handleQRScan = async () => {
    setError('');
    setErrorDetails('');
    if (isScanning) return; // already running
    setIsScanning(true);
    try {
      const elementId = 'qr-reader';
      if (!scannerRef.current) return;
      if (!html5QrcodeRef.current) {
        html5QrcodeRef.current = new Html5Qrcode(elementId);
      }

      const cams = await Html5Qrcode.getCameras();
      setDevices(cams || []);
      if (!cams || cams.length === 0) {
        setError(translations[lang].error);
        setErrorDetails("Aucune caméra détectée sur cet appareil.");
        setIsScanning(false);
        return;
      }
      const preferred = (cams.find(d => /back|rear|environment/i.test(d.label)) || cams[0]).id;
      const cameraId = selectedDeviceId || preferred;

      const config = { fps: 10, qrbox: 250, aspectRatio: 1.0 };
      const onScanSuccess = (decodedText) => {
          // Expect URL like http://.../work/ID or just ID
          try {
            const url = new URL(decodedText);
            const match = url.pathname.match(/\/work\/(\d+)/);
            if (match) {
              stopScanning();
              navigate(`/work/${match[1]}`);
            } else {
              stopScanning();
              navigate(decodedText);
            }
          } catch (_) {
            const idMatch = decodedText.match(/^(\d{1,4})$/);
            if (idMatch) {
              stopScanning();
              navigate(`/work/${idMatch[1]}`);
            }
          }
        };

      try {
        await html5QrcodeRef.current.start(cameraId, config, onScanSuccess, () => {});
      } catch (e1) {
        // Fallback 1: try generic facingMode
        try {
          await html5QrcodeRef.current.start({ facingMode: 'environment' }, config, onScanSuccess, () => {});
        } catch (e2) {
          // Fallback 2: refresh devices and try first
          try {
            const cams2 = await Html5Qrcode.getCameras();
            if (cams2 && cams2.length) {
              await html5QrcodeRef.current.start(cams2[0].id, config, onScanSuccess, () => {});
            } else {
              throw e2;
            }
          } catch (e3) {
            throw e1; // bubble original meaningful error
          }
        }
      }
    } catch (e) {
      setError(translations[lang].error);
      const msg = (e && (e.message || e.name)) || '';
      if (/NotAllowedError/i.test(msg)) setErrorDetails("Accès caméra refusé. Autorisez l'accès et réessayez.");
      else if (/NotFoundError|DevicesNotFoundError|Requested device not found/i.test(msg)) setErrorDetails("Caméra sélectionnée introuvable. Choisissez une autre caméra ci-dessous puis réessayez.");
      else setErrorDetails(msg);
      setIsScanning(false);
    }
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
              <div id="qr-reader" ref={scannerRef} style={{ width: 320, height: 320 }}></div>
              <p>{translations[lang].instructions}</p>
            </div>
          </div>
          <button onClick={handleQRScan} className="scan-button">
            {translations[lang].scanButton}
          </button>
          {isScanning && (
            <p style={{ marginTop: 10, color: '#6c757d' }}>Caméra en cours d'utilisation…</p>
          )}
          {isScanning && (
            <div style={{ marginTop: 10 }}>
              <button onClick={stopScanning} className="submit-button">Arrêter</button>
            </div>
          )}
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

        {devices && devices.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <label htmlFor="camSel" style={{ marginRight: 8, fontWeight: 600 }}>Caméra:</label>
            <select id="camSel" value={selectedDeviceId} onChange={(e) => setSelectedDeviceId(e.target.value)} className="id-input" style={{ maxWidth: 420 }}>
              <option value="">Automatique</option>
              {devices.map(d => (
                <option key={d.id} value={d.id}>{d.label || d.id}</option>
              ))}
            </select>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
            {errorDetails && <div style={{ marginTop: 6, fontWeight: 400 }}>{errorDetails}</div>}
          </div>
        )}
      </div>

      <div className="scan-footer">
        <button onClick={() => navigate('/')} className="back-button">
          {translations[lang].back}
        </button>
      </div>
    </div>
  );
}
