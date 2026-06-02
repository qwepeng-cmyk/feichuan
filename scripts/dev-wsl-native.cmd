@echo off
setlocal

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'D:\\fc\\node_modules\\next|D:\\fc\\\\node_modules\\\\next|D:/fc/node_modules/next' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"
if errorlevel 1 exit /b %ERRORLEVEL%

wsl.exe bash /mnt/d/fc/scripts/dev-wsl-native.sh /mnt/d/fc /root/fc-wsl prepare
if errorlevel 1 exit /b %ERRORLEVEL%

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath 'wsl.exe' -ArgumentList @('bash','/root/fc-wsl/scripts/wsl-native-server.sh') -WindowStyle Hidden"
if errorlevel 1 exit /b %ERRORLEVEL%

echo Starting Next dev from /root/fc-wsl on port 3000...
for /l %%N in (1,1,60) do (
  wsl.exe bash -lc "grep -q 'Ready in' /root/fc-wsl/scratch/wsl-native-dev-3000.out.log 2>/dev/null"
  if not errorlevel 1 goto :ready

  wsl.exe bash -lc "grep -q 'Failed to start server' /root/fc-wsl/scratch/wsl-native-dev-3000.err.log 2>/dev/null"
  if not errorlevel 1 (
    wsl.exe bash -lc "cat /root/fc-wsl/scratch/wsl-native-dev-3000.err.log"
    exit /b 1
  )

  ping -n 2 127.0.0.1 >nul
)

echo Timed out waiting for Next dev.
wsl.exe bash -lc "tail -80 /root/fc-wsl/scratch/wsl-native-dev-3000.out.log; tail -80 /root/fc-wsl/scratch/wsl-native-dev-3000.err.log"
exit /b 1

:ready
for /f "tokens=1" %%I in ('wsl.exe hostname -I') do (
  set WSL_NATIVE_IP=%%I
  goto :proxy
)

:proxy
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'localhost-3000-proxy.js' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"
if errorlevel 1 exit /b %ERRORLEVEL%

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$node='C:\tmp\node-v22.21.1-win-x64\node-v22.21.1-win-x64\node.exe'; if (!(Test-Path $node)) { throw 'Windows Node runtime not found: ' + $node }; $env:WSL_TARGET_HOST='%WSL_NATIVE_IP%'; Start-Process -FilePath $node -ArgumentList @('D:\fc\scripts\localhost-3000-proxy.js') -WindowStyle Hidden"
if errorlevel 1 exit /b %ERRORLEVEL%

echo Ready: http://localhost:3000/

for /f "tokens=1" %%I in ('wsl.exe hostname -I') do (
  echo WSL fallback URL: http://%%I:3000/
  goto :done
)

:done
exit /b 0
