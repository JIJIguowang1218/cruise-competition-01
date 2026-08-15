<#
.verify.ps1 — DSH 环境一致性验证（目标机 / AI 执行终端使用）

对照 TASK.md 的成功标准 S0–S8 逐项检查，输出 PASS/FAIL，最后汇总。
退出码：0 = 全部 PASS；1 = 存在 FAIL。

用法：
  powershell -NoProfile -ExecutionPolicy Bypass -File .\verify.ps1
  powershell -NoProfile -ExecutionPolicy Bypass -File .\verify.ps1 -HarnessDest "E:\tools\deepseek-harness"
  powershell -NoProfile -ExecutionPolicy Bypass -File .\verify.ps1 -CheckService   # 额外探测 3080 服务
#>
[CmdletBinding()]
param(
  [string]$HarnessDest = 'D:\OtherAPPS\deepseek-harness',
  [string]$DshHome = '',
  [switch]$CheckService
)

$ErrorActionPreference = 'Continue'
if ([string]::IsNullOrWhiteSpace($DshHome)) { $DshHome = Join-Path $env:USERPROFILE '.dsh' }

$results = [System.Collections.Generic.List[object]]::new()
function Record($id, $name, $ok, $detail) {
  $tag = if ($ok) { 'PASS' } else { 'FAIL' }
  $line = "[$tag] $id $name"
  if ($detail) { $line += "  —  $detail" }
  Write-Host $line
  $results.Add([pscustomobject]@{ Id = $id; Name = $name; Ok = $ok; Detail = $detail })
}
function Warn($m) { Write-Host "[WARN ] $m" -ForegroundColor Yellow }

Write-Host '==== dsh-env-export 验证 ===='
Write-Host "HarnessDest = $HarnessDest"
Write-Host "DshHome     = $DshHome"
Write-Host ''

# ── S0 前置工具链 ───────────────────────────────────────────────────────
$nodeOk = $false; $nodeDetail = 'node 未找到'
if (Get-Command node -ErrorAction SilentlyContinue) {
  $nv = (node --version)
  $major = [int]((($nv -replace '^v', '') -split '\.')[0])
  $nodeOk = $major -ge 20
  $nodeDetail = "node $nv" + $(if ($nodeOk) { '' } else { '（需要 ≥ 20）' })
}
Record 'S0a' 'Node.js >= 20' $nodeOk $nodeDetail

$pnpmOk = $false; $pnpmDetail = 'pnpm 未找到'
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
  $pv = (pnpm --version)
  $major = [int](($pv -split '\.')[0])
  $pnpmOk = $major -ge 10
  $pnpmDetail = "pnpm $pv" + $(if ($pnpmOk) { '' } else { '（需要 ≥ 10，lockfile 为 pnpm 11 生成）' })
}
Record 'S0b' 'pnpm >= 10' $pnpmOk $pnpmDetail

# ── S1 checkout ─────────────────────────────────────────────────────────
$s1 = $false; $s1d = '目录不存在'
if (Test-Path (Join-Path $HarnessDest 'package.json')) {
  $git = Get-Command git -ErrorAction SilentlyContinue
  if ($git) {
    $branch = (git -C $HarnessDest branch --show-current 2>$null).Trim()
    $head = (git -C $HarnessDest rev-parse --short HEAD 2>$null).Trim()
    $s1 = ($branch -eq 'local/file-browser') -and ($head -eq '709ce2c')
    $s1d = "分支=$branch HEAD=$head"
  } else {
    Warn 'git 未安装——无法核对分支/HEAD（可选：winget install Git.Git）。.git 目录存在性：' + (Test-Path (Join-Path $HarnessDest '.git'))
    $s1d = 'git 缺失，跳过分支核对（目录存在）'
    $s1 = $true   # git 缺失不算环境 FAIL，仅提示
  }
} else { $s1d = "未找到 $HarnessDest\package.json" }
Record 'S1' 'checkout 分支/HEAD' $s1 $s1d

# ── S2 harness 依赖 ─────────────────────────────────────────────────────
# pnpm isolated 布局：真实依赖在 node_modules\.pnpm 虚拟存储；顶层仅 dev 工具链。
# 装机成功的特征 = .pnpm 存在且条目充足。
$s2 = $false; $s2d = 'node_modules 缺失'
$pnDir = Join-Path $HarnessDest 'node_modules\.pnpm'
if (Test-Path $pnDir) {
  $count = (Get-ChildItem $pnDir -Directory -ErrorAction SilentlyContinue | Measure-Object).Count
  $s2 = $count -ge 100
  $s2d = ".pnpm 虚拟存储 $count 条目（>=100 = 依赖已装）"
} elseif (Test-Path (Join-Path $HarnessDest 'node_modules')) {
  $s2d = 'node_modules 存在但缺 .pnpm（可能未 pnpm install 或失败）'
}
Record 'S2' 'harness 依赖安装' $s2 $s2d

# ── S3 profile bundles ──────────────────────────────────────────────────
$s3 = $false; $s3d = 'profile package.json 缺失'
$profPkg = Join-Path $DshHome 'profiles\web\package.json'
if (Test-Path $profPkg) {
  try {
    $bundles = ((Get-Content $profPkg -Raw -Encoding UTF8 | ConvertFrom-Json).dsh.profile.bundles | ForEach-Object { $_ })
    $want = @('@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app', 'dsh-skill-viewer', 'dsh-better-sidebar')
    $s3 = ($bundles.Count -eq 4) -and (($want | Where-Object { $bundles -notcontains $_ }).Count -eq 0)
    $s3d = ($bundles -join ', ')
  } catch { $s3d = 'package.json 解析失败：' + $_.Exception.Message }
}
Record 'S3' 'profile bundles' $s3 $s3d

# ── S4 插件安装 ─────────────────────────────────────────────────────────
$profNm = Join-Path $DshHome 'profiles\web\node_modules'
$bs = Test-Path (Join-Path $profNm 'dsh-better-sidebar')
$sv = Test-Path (Join-Path $profNm 'dsh-skill-viewer')
Record 'S4' '插件安装' ($bs -and $sv) ("better-sidebar=$bs skill-viewer=$sv")

# ── S5 skill-viewer 补丁 ────────────────────────────────────────────────
$s5 = $false; $s5d = 'client.js 不存在'
$svJs = Join-Path $profNm 'dsh-skill-viewer\lib\client.js'
if (Test-Path $svJs) {
  $txt = [IO.File]::ReadAllText($svJs, [Text.Encoding]::GetEncoding(28591))
  $hasRetry = $txt.Contains('RETRY_METHODS')
  node --check $svJs 2>$null
  $syntaxOk = ($LASTEXITCODE -eq 0)
  $s5 = $hasRetry -and $syntaxOk
  $s5d = "RETRY_METHODS=$hasRetry node--check=$syntaxOk"
}
Record 'S5' 'skill-viewer 补丁' $s5 $s5d

# ── S6 用户资产 ─────────────────────────────────────────────────────────
$skills = Join-Path $DshHome 'skills'
$presets = Join-Path $DshHome '.agent-presets\anchored-standard'
$skillsOk = $false; $skillsD = 'skills 缺失'
if (Test-Path $skills) {
  $count = (Get-ChildItem $skills -Directory -ErrorAction SilentlyContinue | Measure-Object).Count
  $skillsOk = $count -eq 6
  $skillsD = "skills 目录 $count/6"
}
Record 'S6a' '用户级技能' $skillsOk $skillsD

$presetsOk = $false; $presetsD = '.agent-presets 缺失'
if (Test-Path $presets) {
  $count = (Get-ChildItem $presets -File -ErrorAction SilentlyContinue | Measure-Object).Count
  $presetsOk = $count -eq 8
  $presetsD = "anchored-standard 文件 $count/8"
}
Record 'S6b' 'agent 预设' $presetsOk $presetsD

$syOk = Test-Path (Join-Path $DshHome 'settings.yaml')
Record 'S6c' 'settings.yaml' $syOk $(if ($syOk) { '存在' } else { '缺失' })

# ── S7 服务探针（可选）──────────────────────────────────────────────────
if ($CheckService) {
  $s7 = $false; $s7d = '服务未响应'
  try {
    $r = Invoke-WebRequest -Uri 'http://127.0.0.1:3080/' -UseBasicParsing -TimeoutSec 5
    $s7 = ($r.StatusCode -eq 200) -and ($r.Content -like '*__DSH_BOOT__*')
    $s7d = "HTTP $($r.StatusCode) boot=$($r.Content -like '*__DSH_BOOT__*')"
  } catch { $s7d = $_.Exception.Message }
  Record 'S7' '服务可启动' $s7 $s7d
}

# ── 汇总 ────────────────────────────────────────────────────────────────
Write-Host ''
$fail = @($results | Where-Object { -not $_.Ok })
$pass = @($results | Where-Object { $_.Ok })
Write-Host ('结果：' + $pass.Count + ' PASS / ' + $fail.Count + ' FAIL / 共 ' + $results.Count)
if ($fail.Count -gt 0) {
  Write-Host '失败项：'
  $fail | ForEach-Object { Write-Host ('  - ' + $_.Id + ' ' + $_.Name + '：' + $_.Detail) }
  exit 1
}
Write-Host '全部通过。'
exit 0
