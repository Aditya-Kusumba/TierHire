@echo off
echo ============================================
echo     TierHire - Starting Application
echo ============================================
echo.

echo [1/2] Starting Backend Server...
start cmd /k "cd server && npm start"
timeout /t 5 /nobreak > nul

echo [2/2] Starting Frontend Client...
start cmd /k "cd client && npm run dev"

echo.
echo ============================================
echo     Application Started!
echo ============================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window...
pause > nul
