# Wait until the DSH web server is actually ready (HTTP 200 + boot manifest),
# then the launcher opens the browser. Replaces a fixed sleep that raced slow
# boots (profile bundles, cold pnpm/tsx/node cache).
$deadline = (Get-Date).AddSeconds(120)
$ready = $false
do {
  Start-Sleep -Milliseconds 500
  try {
    $r = Invoke-WebRequest -Uri 'http://127.0.0.1:3080/' -UseBasicParsing -TimeoutSec 2
    if ($r.StatusCode -eq 200 -and $r.Content -like '*__DSH_BOOT__*') { $ready = $true }
  } catch {}
} until ($ready -or (Get-Date) -gt $deadline)
if ($ready) { Write-Host 'Server ready, opening browser.' }
else { Write-Host 'Server not ready within 120s; opening browser anyway (refresh if needed).' }
