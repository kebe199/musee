# Backend API - Musée des Civilisations Noires

## Déploiement sur Render

### Configuration requise

1. **Variables d'environnement** :
   - `NODE_ENV=production`
   - `CORS_ORIGIN=https://musee-qb6n.onrender.com`
   - `PORT=3001`

2. **Commandes de build et start** :
   - Build Command: `npm install`
   - Start Command: `npm start`

### Structure des routes

- `GET /` - Page d'accueil du backend
- `GET /health` - Vérification de santé
- `GET /api/test` - Test de l'API
- `GET /api/works` - Liste des œuvres
- `GET /api/works/:id` - Détail d'une œuvre
- `POST /api/works` - Créer une œuvre
- `PUT /api/works/:id` - Modifier une œuvre
- `DELETE /api/works/:id` - Supprimer une œuvre
- `POST /api/works/:id/like` - Liker une œuvre

### Fichiers de données

Le fichier `works.json` est créé automatiquement au démarrage s'il n'existe pas.

### Logs

Le serveur affiche des logs détaillés pour le débogage :
- Toutes les requêtes entrantes
- État du chargement des données
- Erreurs éventuelles
