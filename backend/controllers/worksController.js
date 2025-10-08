const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'works.json');

function loadDataSafe() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error('Le fichier works.json ne contient pas un tableau.');
    }
    return parsed;
  } catch (err) {
    console.error('[worksController] Erreur de chargement/parsing works.json:', err.message);
    return null;
  }
}

function saveDataSafe(arr) {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(arr, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('[worksController] Erreur d\'écriture works.json:', err.message);
    return false;
  }
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
exports.list = (req, res) => {
  const data = loadDataSafe();
  if (!data) {
    return res.status(500).json({ error: 'Données invalides (works.json)' });
  }
  try {
    const includeAll = req.query && req.query.admin === '1';
    const filtered = includeAll ? data : data.filter(w => !w.archived);
    const mapped = filtered.map(w => attachFullUrls(req, w));
    res.json(mapped);
  } catch (err) {
    console.error('[worksController] Erreur lors de la préparation des données:', err.message);
    res.status(500).json({ error: 'Préparation des données échouée' });
  }
};

// Détail par ID
exports.getById = (req, res) => {
  const id = req.params.id;
  const data = loadDataSafe();
  if (!data) {
    return res.status(500).json({ error: 'Données invalides (works.json)' });
  }
  try {
    const found = data.find(w => String(w.id) === String(id));
    if (!found) return res.status(404).json({ error: 'Oeuvre introuvable' });
    res.json(attachFullUrls(req, found));
  } catch (err) {
    console.error('[worksController] Erreur lors de la récupération de l\'œuvre:', err.message);
    res.status(500).json({ error: 'Erreur interne' });
  }
};

// Création d'une œuvre
exports.create = (req, res) => {
  const data = loadDataSafe();
  if (!data) return res.status(500).json({ error: 'Données invalides (works.json)' });
  try {
    const body = req.body || {};
    const nextId = (data.reduce((m, w) => Math.max(m, Number(w.id) || 0), 0) || 0) + 1;
    const newWork = { id: nextId, archived: false, ...body };
    data.push(newWork);
    if (!saveDataSafe(data)) return res.status(500).json({ error: 'Écriture des données échouée' });
    res.status(201).json(attachFullUrls(req, newWork));
  } catch (err) {
    console.error('[worksController] Erreur création:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la création' });
  }
};

// Mise à jour d'une œuvre
exports.update = (req, res) => {
  const id = req.params.id;
  const data = loadDataSafe();
  if (!data) return res.status(500).json({ error: 'Données invalides (works.json)' });
  try {
    const idx = data.findIndex(w => String(w.id) === String(id));
    if (idx === -1) return res.status(404).json({ error: 'Oeuvre introuvable' });
    const updated = { ...data[idx], ...req.body };
    data[idx] = updated;
    if (!saveDataSafe(data)) return res.status(500).json({ error: 'Écriture des données échouée' });
    res.json(attachFullUrls(req, updated));
  } catch (err) {
    console.error('[worksController] Erreur mise à jour:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour' });
  }
};

// Archivage d'une œuvre
exports.archive = (req, res) => {
  const id = req.params.id;
  const data = loadDataSafe();
  if (!data) return res.status(500).json({ error: 'Données invalides (works.json)' });
  try {
    const idx = data.findIndex(w => String(w.id) === String(id));
    if (idx === -1) return res.status(404).json({ error: 'Oeuvre introuvable' });
    data[idx].archived = true;
    if (!saveDataSafe(data)) return res.status(500).json({ error: 'Écriture des données échouée' });
    res.json({ success: true });
  } catch (err) {
    console.error('[worksController] Erreur archivage:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de l\'archivage' });
  }
};
