#!/usr/bin/env node

// Charger les variables d'environnement
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const worksRoutes = require('./routes/works');

// Initialiser les données au démarrage
console.log('Initialisation des données...');
require('./init-data');

const app = express();

// Configuration CORS pour production
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Logs de débogage pour toutes les requêtes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// servir les médias (images, audio, video) et qrcodes
app.use('/media', express.static(path.join(__dirname, 'public', 'media')));
app.use('/qrcodes', express.static(path.join(__dirname, 'public', 'qrcodes')));

// API
app.use('/api/works', worksRoutes);

// route test par défaut
app.get('/', (req, res) => {
  res.send('✅ Backend du musée fonctionne correctement');
});

// Route de test pour l'API
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API fonctionne', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Route de santé
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 API test: http://localhost:${PORT}/api/test`);
  console.log(`📚 Works API: http://localhost:${PORT}/api/works`);
});
