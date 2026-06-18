@echo off
setlocal

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process | Where-Object { $_.Name -match '^node(\\.exe)?$' -and $_.CommandLine -match 'D:\\fc\\node_modules\\next|D:\\fc\\\\node_modules\\\\next|D:/fc/node_modules/next|D:\\FC\\node_modules\\next|D:\\FC\\\\node_modules\\\\next|D:/FC/node_modules/next' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"
if errorlevel 1 exit /b %ERRORLEVEL%

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$owners=@(Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Where-Object { $_.State -eq 'Listen' } | Select-Object -ExpandProperty OwningProcess -Unique); foreach ($ownerPid in $owners) { $proc=Get-CimInstance Win32_Process -Filter ('ProcessId=' + $ownerPid) -ErrorAction SilentlyContinue; if ($proc -and $proc.Name -match '^node(\\.exe)?$' -and $proc.CommandLine -notmatch 'localhost-3000-proxy\.js') { Stop-Process -Id $ownerPid -Force -ErrorAction SilentlyContinue } }; Get-CimInstance Win32_Process | Where-Object { $_.Name -match '^node(\\.exe)?$' -and $_.CommandLine -notmatch 'localhost-3000-proxy\.js' -and ($_.CommandLine -like '*next start -p 3000*' -or $_.CommandLine -like '*node_modules\\next\\dist\\bin\\next*' -or $_.CommandLine -like '*node_modules/next/dist/bin/next*') } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }; exit 0"
if errorlevel 1 exit /b %ERRORLEVEL%

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process | Where-Object { $_.Name -match '^node(\\.exe)?$' -and ($_.CommandLine -like '*node_modules\\next\\dist\\bin\\next*' -or $_.CommandLine -like '*node_modules/next/dist/bin/next*' -or $_.CommandLine -like '*node_modules\\next\\dist\\server\\lib\\start-server*' -or $_.CommandLine -like '*node_modules/next/dist/server/lib/start-server*') } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"
if errorlevel 1 exit /b %ERRORLEVEL%

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'wsl.exe' -and $_.CommandLine -match 'wsl-native-server\.sh' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"
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
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process | Where-Object { $_.Name -match '^node(\\.exe)?$' -and $_.CommandLine -match 'localhost-3000-proxy.js' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"
if errorlevel 1 exit /b %ERRORLEVEL%

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$candidates=@('C:\tmp\node-v22.21.1-win-x64\node-v22.21.1-win-x64\node.exe'); $cmd=Get-Command node.exe -ErrorAction SilentlyContinue; if ($cmd) { $candidates += $cmd.Source }; $candidates += @(Get-ChildItem -Path 'C:\tmp' -Recurse -Filter node.exe -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName); $node=$null; foreach ($candidate in ($candidates | Select-Object -Unique)) { if ((Test-Path $candidate) -and (& $candidate -v 2>$null)) { $node=$candidate; break } }; if (!$node) { throw 'Working Windows Node runtime not found.' }; $env:WSL_TARGET_HOST='%WSL_NATIVE_IP%'; Start-Process -FilePath $node -ArgumentList @('D:\fc\scripts\localhost-3000-proxy.js') -WindowStyle Hidden"
if errorlevel 1 exit /b %ERRORLEVEL%

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$urls=@('http://127.0.0.1:3000/','http://localhost:3000/','http://[::1]:3000/'); foreach ($url in $urls) { $ok=$false; foreach ($i in 1..30) { try { $r=Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3; if ($r.StatusCode -eq 200) { $ok=$true; break } } catch { Start-Sleep -Seconds 1 } }; if (!$ok) { Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Format-Table -AutoSize; throw ('Localhost proxy started but ' + $url + ' did not return 200.') } }"
if errorlevel 1 exit /b %ERRORLEVEL%

echo Ready: http://localhost:3000/

for /f "tokens=1" %%I in ('wsl.exe hostname -I') do (
  echo WSL fallback URL: http://%%I:3000/
  goto :done
)

:done
exit /b 0
