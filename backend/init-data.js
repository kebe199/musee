const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, 'data', 'works.json');

// Vérifier si le fichier works.json existe
if (!fs.existsSync(DATA_PATH)) {
  console.log('Création du fichier works.json...');
  
  // Créer le dossier data s'il n'existe pas
  const dataDir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Données par défaut
  const defaultData = [
    {
      "id": 1,
      "title": {
        "fr": "Masque Dan",
        "en": "Dan Mask",
        "wo": "Masquu Dan"
      },
      "description": {
        "fr": "Masque cérémonial de la culture Dan (Côte d'Ivoire), utilisé lors des danses initiatiques pour symboliser la protection et la sagesse.",
        "en": "Ceremonial mask from the Dan culture (Ivory Coast), used during initiation dances to symbolize protection and wisdom.",
        "wo": "Masku xew-xew bu bawoo ci cosaan ak aada waa Dan (Kot-d'Iwaar), ñu koy jëfandikoo ci feccu ndoorte ngir màndargaal aar ak xel mu ñaw."
      },
      "image": "/media/masque1.jpg",
      "audio": {
        "en": "/media/Dan mask.mp3",
        "fr": "/media/Masque dan.mp3",
        "wo": "/media/masquu dan.mp3"
      },
      "video": "",
      "history": {
        "fr": "Origine : Côte d'Ivoire, région de Man. Utilisé par les danseurs initiés lors des cérémonies pour transmettre les valeurs morales et spirituelles de la communauté.",
        "en": "Origin: Ivory Coast, Man region. Used by initiated dancers during ceremonies to convey the moral and spiritual values of the community.",
        "wo": "Cosaan : Kot-d'Iwaar, diwaanu Man. Fecckat yu njëkk yi ñoo koy jëfandikoo ci xew-xew yi ngir fësal valeur moral ak spirituel yu askan wi."
      },
      "culturalContext": {
        "fr": "Les masques Dan sont des objets sacrés qui ne peuvent être vus que par les initiés. Ils représentent les esprits de la nature et servent de médiateurs entre les vivants et les ancêtres.",
        "en": "Dan masks are sacred objects that can only be seen by initiates. They represent nature spirits and serve as mediators between the living and the ancestors.",
        "wo": "Masku Dan ay mbir yu sell lañu, te ñi tàmbali rek ñoo ko mëna gis. Dañuy màndargaal rab yi ci nature bi, ñuy nekk diggante ñiy dundu ak seeni maam."
      },
      "significance": {
        "fr": "Symbole de protection, de sagesse et de continuité culturelle. Le masque enseigne les valeurs traditionnelles aux jeunes générations.",
        "en": "Symbol of protection, wisdom and cultural continuity. The mask teaches traditional values to younger generations.",
        "wo": "Mask bi dafay màndargaal aar, xel mu ñaw, ak wéyal cosaan ak aada, muy jàngal ndaw ñi valeur yu cosaan ak aada."
      },
      "likes": 0,
      "likedBy": []
    }
  ];
  
  // Écrire le fichier
  fs.writeFileSync(DATA_PATH, JSON.stringify(defaultData, null, 2), 'utf8');
  console.log('Fichier works.json créé avec succès');
} else {
  console.log('Fichier works.json existe déjà');
}

module.exports = DATA_PATH;
