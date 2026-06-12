@echo off
setlocal
cd /d "%~dp0"

set "NODE_EXE=C:\tmp\node-v22.21.1-win-x64\node-v22.21.1-win-x64\node.exe"

if not exist "%NODE_EXE%" (
  echo Node runtime not found:
  echo %NODE_EXE%
  pause
  exit /b 1
)

if not exist "node_modules\next\dist\bin\next" (
  echo Next.js executable not found. Make sure dependencies are installed.
  pause
  exit /b 1
)

echo Starting N-TET local admin on http://127.0.0.1:3000/admin
echo Keep this window open while using the local website.
echo.
"%NODE_EXE%" node_modules\next\dist\bin\next start -H 127.0.0.1 -p 3000

echo.
echo Local server stopped.
pause
