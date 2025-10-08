import React from 'react';

export default function LanguageSelector({ lang, setLang }) {
  return (
    <div className="lang-switch">
      <button onClick={() => setLang('fr')} className={lang === 'fr' ? 'active' : ''}>🇫🇷</button>
      <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>🇬🇧</button>
      <button onClick={() => setLang('wo')} className={lang === 'wo' ? 'active' : ''}>🌍wo</button>
    </div>
  );
}
