$ErrorActionPreference = "Stop"
Write-Host "Starting PostCSS development server..."

$gemPath = (bundle show jekyll-postcss).Trim()
$postcssPath = Join-Path $gemPath "bin\postcss"
$postcssProcess = Start-Process `
    -FilePath "node" `
    -ArgumentList "`"$postcssPath`"", "--development" `
    -PassThru

try {
    Write-Host "Waiting for PostCSS server on localhost:8124..."

    # try starting the postcss process and connecting to it
    $connected = $false
    for ($i = 0; $i -lt 100; $i++) {
        $client = New-Object System.Net.Sockets.TcpClient
        try {
            $asyncResult = $client.BeginConnect("localhost", 8124, $null, $null)
            if ($asyncResult.AsyncWaitHandle.WaitOne(100, $false)) {
                $client.EndConnect($asyncResult)
                $connected = $true
                break
            }
        }
        catch {
            # Connection failed, retry next iteration
        }
        finally {
            $client.Dispose()
        }
        Start-Sleep -Milliseconds 100
    }
    if (-not $connected) {
        throw "Could not connect to the PostCSS server on localhost:8124."
    }

    Write-Host "PostCSS server is ready."
    Write-Host "Starting Jekyll..."

    # finally start the jekyll server
    bundle exec jekyll serve --livereload
}
finally {
    Write-Host "`nJekyll server stopped. Cleaning up background processes..."
    if ($postcssProcess -and -not $postcssProcess.HasExited) {
        Write-Host "Stopping PostCSS server..."
        Stop-Process -Id $postcssProcess.Id -Force -ErrorAction SilentlyContinue
        Write-Host "PostCSS server successfully stopped."
    } else {
        Write-Host "PostCSS server was already stopped."
    }
    Write-Host "Development environment shut down complete."
}
