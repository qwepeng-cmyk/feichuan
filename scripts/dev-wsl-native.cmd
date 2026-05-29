@echo off
setlocal

wsl.exe bash /mnt/d/fc/scripts/dev-wsl-native.sh
if errorlevel 1 exit /b %ERRORLEVEL%

for /f "tokens=1" %%I in ('wsl.exe hostname -I') do (
  echo WSL fallback URL: http://%%I:3000/
  goto :done
)

:done
exit /b 0
