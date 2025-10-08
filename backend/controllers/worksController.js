const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const DATA_PATH = path.join(__dirname, '..', 'data', 'works.json');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'musee',
  password: 'Cheikh0una',
  port: 5432,
});

function loadData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

function attachFullUrls(req, work) {
  const host = `${req.protocol}://${req.get('host')}`;
  return {
    ...work,
    image: work.image ? `${host}${work.image}` : '',
    audio: work.audio ? `${host}${work.audio}` : '',
    video: work.video ? `${host}${work.video}` : ''
  };
}

// Liste des œuvres
exports.list = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM works ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Détail d'une œuvre
exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query('SELECT * FROM works WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Oeuvre introuvable' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Ajout d'une œuvre
exports.create = async (req, res) => {
  try {
    const {
      title, description, image, audio, video, history, culturalContext, significance
    } = req.body;
    const result = await pool.query(
      `INSERT INTO works (title, description, image, audio, video, history, culturalcontext, significance)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        title,
        description,
        image,
        audio,
        video,
        history,
        culturalContext,
        significance
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur lors de l\'ajout' });
  }
};
