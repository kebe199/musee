#!/bin/bash

echo "🎨 Démarrage du Musée des Civilisations Noires"
echo "================================================"

echo ""
echo "📦 Installation des dépendances backend..."
cd backend
npm install

echo ""
echo "📦 Installation des dépendances frontend..."
cd ../frontend
npm install

echo ""
echo "🗂️ Création des dossiers et placeholders..."
cd ../backend
node create_placeholders.js

echo ""
echo "🔗 Génération des QR codes..."
npm run gen-qrcodes

echo ""
echo "🚀 Démarrage du serveur backend..."
gnome-terminal --title="Backend Server" -- bash -c "cd backend && npm run dev; exec bash" &

echo ""
echo "⏳ Attente du démarrage du backend..."
sleep 3

echo ""
echo "🌐 Démarrage du frontend..."
gnome-terminal --title="Frontend App" -- bash -c "cd frontend && npm start; exec bash" &

echo ""
echo "✅ Application démarrée avec succès!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:4000"
echo ""
echo "Appuyez sur Entrée pour fermer cette fenêtre..."
read
