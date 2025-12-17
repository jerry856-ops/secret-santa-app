@echo off
echo Starting Secret Santa project 🥀

:: ----- START BACKEND -----
echo Starting backend...
start cmd /k "cd backend && node server.js"

:: ----- OPEN FRONTEND -----
echo Opening frontend...
start "" "frontend\index.html"

echo Everything running! 🥀
pause
