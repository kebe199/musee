const express = require('express');
const cors = require('cors');
const path = require('path');
const worksRoutes = require('./routes/works');

// Initialiser les données au démarrage
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

// servir les médias (images, audio, video) et qrcodes
app.use('/media', express.static(path.join(__dirname, 'public', 'media')));
app.use('/qrcodes', express.static(path.join(__dirname, 'public', 'qrcodes')));

// API
app.use('/api/works', worksRoutes);

// route test par défaut
app.get('/', (req, res) => {
  res.send('✅ Backend du musée fonctionne correctement');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
