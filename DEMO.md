# 🎨 Démonstration - Musée des Civilisations Noires

## 🚀 Démarrage Rapide

### Option 1: Script Automatique (Recommandé)
```bash
# Windows
start.bat

# Linux/Mac
./start.sh
```

### Option 2: Démarrage Manuel

#### 1. Backend
```bash
cd backend
npm install
npm run dev
```

#### 2. Frontend (dans un nouveau terminal)
```bash
cd frontend
npm install
npm start
```

## 📱 Utilisation de l'Application

### 1. Page d'Accueil
- **URL**: `http://localhost:3000`
- **Fonctionnalités**:
  - Collection complète des œuvres
  - Barre de recherche multilingue
  - Sélecteur de langue (FR/EN/WO)
  - Cartes interactives avec aperçu

### 2. Page de Détail d'Œuvre
- **Accès**: Cliquer sur "Voir plus" sur une carte
- **URL**: `http://localhost:3000/work/{id}`
- **Fonctionnalités**:
  - Image haute qualité
  - Description complète multilingue
  - Lecteur audio intégré
  - Informations culturelles détaillées
  - Contexte historique et signification

### 3. Page de Scan QR
- **URL**: `http://localhost:3000/scan`
- **Fonctionnalités**:
  - Interface de scan QR Code
  - Saisie manuelle d'ID d'œuvre
  - Redirection automatique

## 🎯 Fonctionnalités Démonstrées

### ✅ Support Multilingue Complet
- **Français** - Langue principale
- **Anglais** - International  
- **Wolof** - Langue locale du Sénégal

### ✅ Accessibilité Audio
- Descriptions audio pour chaque œuvre
- Lecteur intégré avec contrôles
- Indicateurs visuels d'audio disponible

### ✅ Informations Culturelles Enrichies
- Contexte historique détaillé
- Signification culturelle
- Origine géographique
- Traditions et croyances

### ✅ Interface Moderne et Responsive
- Design adaptatif (mobile/tablet/desktop)
- Animations fluides
- Navigation intuitive
- Recherche en temps réel

### ✅ Système QR Code
- Génération automatique des QR codes
- Redirection directe vers les œuvres
- Saisie manuelle d'ID

## 🔧 Personnalisation

### Ajouter une Nouvelle Œuvre
1. Modifier `backend/data/works.json`
2. Ajouter l'image dans `backend/public/media/`
3. Ajouter l'audio dans `backend/public/media/`
4. Régénérer les QR codes: `npm run gen-qrcodes`

### Modifier les Traductions
- Éditer les objets `translations` dans chaque composant React
- Ajouter de nouvelles langues si nécessaire

### Personnaliser le Design
- Modifier `frontend/src/App.css`
- Adapter les couleurs et styles
- Ajouter de nouvelles animations

## 📊 Données de Démonstration

L'application inclut 5 œuvres de démonstration :

1. **Masque Dan** (Côte d'Ivoire)
2. **Statuette de Fertilité** (Mali)
3. **Tissu Royal Akan** (Ghana)
4. **Sculpture Yoruba** (Nigeria)
5. **Bijoux Touareg** (Sahara)

Chaque œuvre contient :
- Titre multilingue
- Description détaillée
- Image (placeholder)
- Audio (placeholder)
- Contexte culturel
- Signification
- Historique

## 🌐 Accès à Distance

L'application est optimisée pour :
- **Visiteurs sur site** - Scan QR codes
- **Visiteurs à distance** - Navigation web
- **Mobile** - Interface responsive
- **Desktop** - Expérience complète

## 🎨 Design et UX

### Palette de Couleurs
- **Primaire**: Bleu foncé (#2c3e50)
- **Secondaire**: Rouge (#e74c3c)
- **Accent**: Vert (#27ae60)
- **Arrière-plan**: Dégradé violet-bleu

### Typographie
- **Police principale**: Segoe UI
- **Tailles**: Responsive et accessible
- **Contraste**: Optimisé pour la lisibilité

## 🔍 Tests et Validation

### Tests Fonctionnels
- [x] Navigation entre pages
- [x] Changement de langue
- [x] Recherche d'œuvres
- [x] Lecture audio
- [x] Scan QR (simulation)
- [x] Responsive design

### Tests d'Accessibilité
- [x] Contraste des couleurs
- [x] Navigation clavier
- [x] Support audio
- [x] Textes alternatifs

## 📱 Compatibilité

### Navigateurs Supportés
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Appareils
- **Mobile**: iOS 12+, Android 8+
- **Tablet**: iPad, Android tablets
- **Desktop**: Windows 10+, macOS 10.15+, Linux

## 🚀 Déploiement

### Production
1. Build frontend: `npm run build`
2. Configurer serveur web (Nginx/Apache)
3. Déployer backend sur serveur Node.js
4. Configurer domaine et SSL

### Docker (Optionnel)
```bash
# Backend
docker build -t musee-backend ./backend

# Frontend  
docker build -t musee-frontend ./frontend
```

## 📞 Support

Pour toute question ou problème :
- **Documentation**: README.md
- **Issues**: GitHub Issues
- **Email**: support@musee-civilisations-noires.sn

---

**🎨 Musée des Civilisations Noires - Hackathon Digitalisation 2025**
