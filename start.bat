@echo off
echo 🎨 Démarrage du Musée des Civilisations Noires
echo ================================================

echo.
echo 📦 Installation des dépendances backend...
cd backend
call npm install

echo.
echo 📦 Installation des dépendances frontend...
cd ..\frontend
call npm install

echo.
echo 🗂️ Création des dossiers et placeholders...
cd ..\backend
call node create_placeholders.js

echo.
echo 🔗 Génération des QR codes...
call npm run gen-qrcodes

echo.
echo 🚀 Démarrage du serveur backend...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo.
echo ⏳ Attente du démarrage du backend...
timeout /t 3 /nobreak > nul

echo.
echo 🌐 Démarrage du frontend...
start "Frontend App" cmd /k "cd frontend && npm start"

echo.
echo ✅ Application démarrée avec succès!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:4000
echo.
echo Appuyez sur une touche pour fermer cette fenêtre...
pause > nul
