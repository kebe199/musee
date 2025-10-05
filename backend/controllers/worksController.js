const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'works.json');

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

exports.list = (req, res) => {
  const data = loadData().map(w => attachFullUrls(req, w));
  res.json(data);
};

exports.getById = (req, res) => {
  const id = req.params.id;
  const data = loadData();
  const found = data.find(w => String(w.id) === String(id));
  if (!found) return res.status(404).json({ error: 'Oeuvre introuvable' });
  res.json(attachFullUrls(req, found));
};
