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
  const isAbs = (u) => typeof u === 'string' && /^(https?:)?\/\//i.test(u);
  const mapUrl = (val) => {
    if (!val) return '';
    if (typeof val === 'string') {
      return isAbs(val) ? val : `${host}${val}`;
    }
    if (typeof val === 'object') {
      const out = {};
      for (const k of Object.keys(val)) {
        const v = val[k];
        if (!v) continue;
        out[k] = isAbs(v) ? v : `${host}${v}`;
      }
      return out;
    }
    return '';
  };
  return {
    ...work,
    image: mapUrl(work.image),
    audio: mapUrl(work.audio),
    video: mapUrl(work.video)
  };
}

// Liste des œuvres
exports.list = (req, res) => {
  const data = loadDataSafe();
  if (!data) {
    return res.status(500).json({ error: 'Données invalides (works.json)' });
  }
  try {
    // Retourner toutes les œuvres; l'archivage est supprimé
    const mapped = data.map(w => attachFullUrls(req, w));
    res.json(mapped);
  } catch (err) {
    console.error('[worksController] Erreur lors de la préparation des données:', err.message);
    res.status(500).json({ error: 'Préparation des données échouée' });
  }
};

// Suppression d'une œuvre
exports.remove = (req, res) => {
  const id = req.params.id;
  const data = loadDataSafe();
  if (!data) return res.status(500).json({ error: 'Données invalides (works.json)' });
  try {
    const idx = data.findIndex(w => String(w.id) === String(id));
    if (idx === -1) return res.status(404).json({ error: 'Oeuvre introuvable' });
    data.splice(idx, 1);
    if (!saveDataSafe(data)) return res.status(500).json({ error: 'Écriture des données échouée' });
    res.json({ success: true });
  } catch (err) {
    console.error('[worksController] Erreur suppression:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression' });
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
    const newWork = { id: nextId, archived: false, likedBy: [], likes: 0, ...body };
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
    const prev = data[idx];
    const updated = { ...prev, ...req.body };
    // keep data consistent: likes should reflect likedBy length if present
    if (Array.isArray(updated.likedBy)) {
      updated.likes = updated.likedBy.length;
    }
    data[idx] = updated;
    if (!saveDataSafe(data)) return res.status(500).json({ error: 'Écriture des données échouée' });
    res.json(attachFullUrls(req, updated));
  } catch (err) {
    console.error('[worksController] Erreur mise à jour:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour' });
  }
};



// Toggle like for a user (like if not liked, unlike if already liked)
exports.like = (req, res) => {
  const id = req.params.id;
  const data = loadDataSafe();
  if (!data) return res.status(500).json({ error: 'Données invalides (works.json)' });
  try {
    const idx = data.findIndex(w => String(w.id) === String(id));
    if (idx === -1) return res.status(404).json({ error: 'Oeuvre introuvable' });
    const current = data[idx];
    const userRaw = (req.body && (req.body.user || req.body.email)) || '';
    const user = String(userRaw).toLowerCase().trim();
    if (!user) {
      return res.status(400).json({ error: 'Utilisateur requis pour liker.' });
    }
    const likedBy = Array.isArray(current.likedBy) ? [...current.likedBy] : [];
    const i = likedBy.findIndex(u => String(u).toLowerCase() === user);
    let liked;
    if (i >= 0) {
      // already liked -> unlike
      likedBy.splice(i, 1);
      liked = false;
    } else {
      likedBy.push(user);
      liked = true;
    }
    const newLikes = likedBy.length;
    data[idx] = { ...current, likedBy, likes: newLikes };
    if (!saveDataSafe(data)) return res.status(500).json({ error: 'Écriture des données échouée' });
    return res.json({ id: current.id, likes: newLikes, liked });
  } catch (err) {
    console.error('[worksController] Erreur like:', err.message);
    return res.status(500).json({ error: 'Erreur serveur lors du like' });
  }
};
