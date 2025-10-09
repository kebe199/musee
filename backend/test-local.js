const express = require('express');
const cors = require('cors');
const path = require('path');
const worksRoutes = require('./routes/works');

// Initialiser les données
require('./init-data');

const app = express();

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// servir les médias
app.use('/media', express.static(path.join(__dirname, 'public', 'media')));
app.use('/qrcodes', express.static(path.join(__dirname, 'public', 'qrcodes')));

// API
app.use('/api/works', worksRoutes);

// route test
app.get('/', (req, res) => {
  res.send('✅ Backend local fonctionne');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API locale fonctionne', timestamp: new Date().toISOString() });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend local running on port ${PORT}`);
  console.log(`Test: http://localhost:${PORT}/api/test`);
  console.log(`Works: http://localhost:${PORT}/api/works`);
});
