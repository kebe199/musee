# 🎨 Musée des Civilisations Noires - Application Digitale

## 📋 Description

Application web interactive pour le Musée des Civilisations Noires, développée dans le cadre du Hackathon Dakar Slush'D 2025. Cette solution permet aux visiteurs d'accéder à une expérience enrichie et interactive autour des œuvres exposées.

## ✨ Fonctionnalités

### 🌍 Support Multilingue
- **Français** - Langue principale
- **Anglais** - International
- **Wolof** - Langue locale du Sénégal

### 📱 Fonctionnalités Principales
- **Scan QR Code** - Redirection automatique vers les fiches d'œuvres
- **Descriptions Audio** - Accessibilité pour tous les visiteurs
- **Informations Culturelles** - Contexte historique et signification
- **Interface Responsive** - Optimisée pour mobile et desktop
- **Expérience à Distance** - Consultation depuis n'importe où

### 🎯 Fonctionnalités par Page

#### 🏠 Page d'Accueil
- Collection complète des œuvres
- Cartes interactives avec aperçu
- Indicateur audio pour les œuvres avec description sonore
- Navigation multilingue

#### 🔍 Page de Détail d'Œuvre
- Image haute qualité de l'œuvre
- Description complète multilingue
- Lecteur audio intégré
- Informations culturelles détaillées
- Contexte historique et signification

#### 📱 Page de Scan QR
- Interface de scan QR Code
- Saisie manuelle d'ID d'œuvre
- Redirection automatique vers les œuvres

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Backend (API)
```bash
cd backend
npm install
npm run dev
```
Le serveur backend sera accessible sur `http://localhost:4000`

### Frontend (Interface)
```bash
cd frontend
npm install
npm start
```
L'application sera accessible sur `http://localhost:3000`

### Génération des QR Codes
```bash
cd backend
npm run gen-qrcodes
```

## 🏗️ Architecture

### Backend
- **Express.js** - Serveur API REST
- **CORS** - Gestion des requêtes cross-origin
- **QRCode** - Génération des codes QR
- **JSON** - Base de données des œuvres

### Frontend
- **React 18** - Interface utilisateur
- **React Router** - Navigation
- **Axios** - Communication API
- **CSS3** - Styling moderne et responsive

## 📊 Structure des Données

Chaque œuvre contient :
- **Titre** (FR/EN/WO)
- **Description** (FR/EN/WO)
- **Image** - URL de l'image
- **Audio** - URL du fichier audio (optionnel)
- **Historique** - Contexte historique
- **Contexte Culturel** (FR/EN/WO)
- **Signification** (FR/EN/WO)

## 🎨 Design et UX

### Palette de Couleurs
- **Primaire** : Bleu (#2c3e50)
- **Secondaire** : Rouge (#e74c3c)
- **Accent** : Vert (#27ae60)
- **Arrière-plan** : Dégradé violet-bleu

### Responsive Design
- **Mobile First** - Optimisé pour les smartphones
- **Tablet** - Adaptation pour tablettes
- **Desktop** - Expérience complète sur ordinateur

## 🔧 Configuration

### Variables d'Environnement
```env
PORT=4000
FRONTEND_BASE=http://localhost:3000
```

### Personnalisation
- Modifier `backend/data/works.json` pour ajouter des œuvres
- Adapter les traductions dans les composants React
- Personnaliser les styles dans `frontend/src/App.css`

## 📱 Utilisation

### Pour les Visiteurs
1. **Accès Direct** - Visiter `http://localhost:3000`
2. **Scan QR** - Utiliser la page de scan pour les QR codes
3. **Navigation** - Parcourir la collection via les cartes
4. **Audio** - Écouter les descriptions audio
5. **Langues** - Changer de langue via le sélecteur

### Pour les Administrateurs
1. **Ajout d'Œuvres** - Modifier `backend/data/works.json`
2. **Génération QR** - Exécuter `npm run gen-qrcodes`
3. **Médias** - Ajouter images/audio dans `backend/public/media/`

## 🌟 Fonctionnalités Avancées

### Accessibilité
- **Audio** - Descriptions sonores pour tous
- **Contraste** - Couleurs optimisées
- **Navigation** - Clavier et tactile
- **Multilingue** - Support complet Wolof

### Performance
- **Lazy Loading** - Chargement optimisé des images
- **Caching** - Mise en cache des données
- **Responsive** - Adaptation automatique

## 🚀 Déploiement

### Production
1. Build du frontend : `npm run build`
2. Configuration du serveur web (Nginx/Apache)
3. Déploiement du backend sur serveur Node.js
4. Configuration des domaines et SSL

### Docker (Optionnel)
```dockerfile
# Backend
FROM node:16
WORKDIR /app
COPY backend/ .
RUN npm install
EXPOSE 4000
CMD ["npm", "start"]

# Frontend
FROM node:16
WORKDIR /app
COPY frontend/ .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribution

### Développement
1. Fork du projet
2. Création d'une branche feature
3. Commit des changements
4. Push vers la branche
5. Création d'une Pull Request

### Guidelines
- Code en français pour les commentaires
- Documentation en français
- Tests unitaires recommandés
- Respect des conventions React

## 📄 Licence

Ce projet est développé dans le cadre du Hackathon Dakar Slush'D 2025 en partenariat avec le Musée des Civilisations Noires.

## 👥 Équipe

- **Développement** - Équipe Hackathon
- **Design** - Interface utilisateur moderne
- **Contenu** - Données culturelles authentiques

## 📞 Support

Pour toute question ou support :
- **Email** : ckhadim.kebe@univ-thies.sn
- **GitHub** : Issues du projet
- **Documentation** : README.md

---

**🎨 Musée des Civilisations Noires - Hackathon Digitalisation 2025**
