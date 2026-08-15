<#
.install-prereqs.ps1 — 目标机前置环境安装（免管理员）

在干净的 Windows 上安装 Node.js 与 pnpm（DSH 运行所需）。默认采用
"免安装 zip"方案：下载官方 Node 二进制 zip 解压到用户目录，无需管理员
权限；pnpm 通过该 Node 自带的 npm 安装。PATH 持久化到用户级环境变量。

用法：
  powershell -ExecutionPolicy Bypass -File .\install-prereqs.ps1
  # 指定 Node 主版本（默认 24，与源机一致）
  powershell -ExecutionPolicy Bypass -File .\install-prereqs.ps1 -NodeVersion 22
  # 强制用 winget（需要管理员 / winget 可用）
  powershell -ExecutionPolicy Bypass -File .\install-prereqs.ps1 -UseWinget
  # 只检查现状，不安装
  powershell -ExecutionPolicy Bypass -File .\install-prereqs.ps1 -CheckOnly
#>
[CmdletBinding()]
param(
  [string]$NodeVersion = '24',
  [switch]$UseWinget,
  [switch]$CheckOnly
)

$ErrorActionPreference = 'Stop'

function Say($m) { Write-Host "[prereq] $m" -ForegroundColor Green }
function Warn($m) { Write-Host "[warn  ] $m" -ForegroundColor Yellow }
function Die($m) { Write-Host "[error ] $m" -ForegroundColor Red; exit 1 }

$nodeOk = $false; $pnpmOk = $false
if (Get-Command node -ErrorAction SilentlyContinue) {
  $nv = (node --version)
  $nodeOk = $true
  Say "检测到 node $nv"
} else { Warn '未检测到 node' }
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
  $pv = (pnpm --version)
  $pnpmOk = $true
  Say "检测到 pnpm $pv"
} else { Warn '未检测到 pnpm' }

if ($CheckOnly) {
  if ($nodeOk -and $pnpmOk) { Say '前置环境就绪（node + pnpm 均可用）'; exit 0 }
  else { Die '前置环境不完整：node/pnpm 缺失（去掉 -CheckOnly 运行本脚本安装）' }
}

if (-not $nodeOk) {
  if ($UseWinget) {
    Say '使用 winget 安装 Node.js LTS ...'
    winget install --id OpenJS.NodeJS.LTS -e --accept-source-agreements --accept-package-agreements
    if ($LASTEXITCODE -ne 0) { Die 'winget 安装失败（可能无管理员权限或 winget 不可用），改用默认 zip 方案' }
  } else {
    # ── 免安装 zip 方案（无需管理员）──────────────────────────────────
    $destRoot = Join-Path $env:LOCALAPPDATA 'Programs'
    $nodeDir = Join-Path $destRoot 'nodejs'
    New-Item -ItemType Directory -Force -Path $destRoot | Out-Null
    $latestUrl = "https://nodejs.org/dist/latest-v$NodeVersion.x/"
    Say "解析 Node v$NodeVersion 最新版本：$latestUrl"
    $page = Invoke-WebRequest -Uri $latestUrl -UseBasicParsing -TimeoutSec 30
    $zipName = [regex]::Match($page.Content, 'node-v[\d]+\.[\d]+\.[\d]+-win-x64\.zip').Value
    if ([string]::IsNullOrWhiteSpace($zipName)) { Die "无法从 $latestUrl 解析 win-x64 zip 文件名（NodeVersion=$NodeVersion 可能无效）" }
    $zipUrl = $latestUrl + $zipName
    $zipPath = Join-Path $env:TEMP $zipName
    Say "下载 $zipUrl ..."
    Invoke-WebRequest -Uri $zipUrl -OutFile $zipPath -UseBasicParsing -TimeoutSec 300
    Say '解压到 ' + $nodeDir + ' ...'
    if (Test-Path $nodeDir) { Remove-Item $nodeDir -Recurse -Force }
    Expand-Archive -Path $zipPath -DestinationPath $destRoot -Force
    $inner = Join-Path $destRoot ($zipName -replace '\.zip$', '')
    if (Test-Path $inner) { Rename-Item $inner $nodeDir }
    Remove-Item $zipPath -Force -ErrorAction SilentlyContinue
    Say "Node 已就位于 $nodeDir"
  }
  # ── PATH 持久化（用户级，免管理员）──────────────────────────────────
  if (Get-Command node -ErrorAction SilentlyContinue) { $nodeOk = $true }
  elseif (Test-Path (Join-Path $nodeDir 'node.exe')) {
    $userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    if ($userPath -notlike "*$nodeDir*") {
      $newPath = if ([string]::IsNullOrWhiteSpace($userPath)) { $nodeDir } else { $userPath.TrimEnd(';') + ';' + $nodeDir }
      [Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
      Say "已将 $nodeDir 加入用户 PATH（新终端生效；当前会话继续用）"
    }
    $env:Path = $nodeDir + ';' + $env:Path
    $nodeOk = $true
  }
  if (-not $nodeOk) { Die 'node 安装后仍不可用，请检查上述输出' }
  Say "node " + (node --version) + " 就绪"
}

if (-not $pnpmOk) {
  Say '通过 npm 安装 pnpm@11 ...'
  npm install -g pnpm@11
  if ($LASTEXITCODE -ne 0) { Die 'pnpm 安装失败' }
  # npm 全局 bin 在 node 目录内（zip 版），PATH 已含
  $env:Path = $env:Path + ';' + (Join-Path (Split-Path (Get-Command npm -ErrorAction SilentlyContinue).Source) '..')
  if (Get-Command pnpm -ErrorAction SilentlyContinue) { $pnpmOk = $true }
}
if (-not $pnpmOk) {
  # 尝试刷新 PATH（pnpm.cmd 可能在 npm 全局目录）
  $npmPrefix = (npm prefix -g 2>$null)
  if ($npmPrefix -and (Test-Path (Join-Path $npmPrefix 'pnpm.cmd'))) {
    $env:Path = $npmPrefix + ';' + $env:Path
    $pnpmOk = $true
  }
}
if (-not $pnpmOk) { Die 'pnpm 安装后仍不可用' }

Say "pnpm " + (pnpm --version) + " 就绪"
Say ''
Say '============================================================'
Say '前置环境完成：node ' + (node --version) + ' / pnpm ' + (pnpm --version)
Say '下一步：运行 setup.ps1 安装 DeepSeek Harness 环境'
Say '提示：若 PATH 未持久化（新终端找不到 node/pnpm），重开终端或手动加 PATH'
Say '============================================================'
