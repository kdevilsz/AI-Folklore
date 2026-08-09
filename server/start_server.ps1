$ScriptDir = $PSScriptRoot
if (-not $ScriptDir) {
    $ScriptDir = Get-Location
}
$RootDir = (Get-Item $ScriptDir).Parent.FullName

Write-Host "========================================="
Write-Host "Starting LoreBridge Server Robustly"
Write-Host "Press Ctrl+C twice quickly to stop."
Write-Host "========================================="

while ($true) {
    Write-Host "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] Building latest frontend bundle..."
    Set-Location -Path $RootDir
    python build_bundle.py

    Write-Host "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] Starting server.py..."
    Set-Location -Path $ScriptDir
    
    # Run the python server. If it crashes, it will fall through to the next lines
    python server.py
    
    $ExitCode = $LASTEXITCODE
    Write-Host "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] Server crashed or stopped with exit code $ExitCode."
    Write-Host "Restarting in 5 seconds... (Press Ctrl+C now to abort)"
    Start-Sleep -Seconds 5
}
