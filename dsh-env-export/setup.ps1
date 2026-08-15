<#
.dsh-env-setup.ps1 — DeepSeek Harness 环境一键安装（目标机使用）

把本套件（dsh-env-export）恢复到目标 Windows 电脑，得到与源机一致的环境：
  - 官方 checkout（含本地分支 local/file-browser 的全部修改与 git 历史）
  - web profile（dsh-better-sidebar + dsh-skill-viewer，含 skill-viewer 断线重试补丁）
  - 用户级技能、agent 预设、全局设置

用法（目标机，管理员终端更稳）：
  powershell -ExecutionPolicy Bypass -File .\setup.ps1

常用参数：
  -HarnessDest <path>    harness 安装位置，默认 D:\OtherAPPS\deepseek-harness（与源机一致）
  -DshHome <path>        ~/.dsh 位置，默认 %USERPROFILE%\.dsh
  -SkipHarness           跳过 harness 解压/依赖安装（已装过时用）
  -SkipProfile           跳过 profile 配置/插件安装
  -SkipDotDsh            跳过技能/预设/设置复制
  -DryRun                只打印将执行的操作，不写任何文件

前置要求（自动检测）：
  - Node.js >= 20（https://nodejs.org）
  - pnpm 11（npm install -g pnpm@11）
  - Windows 10 1803+（自带 tar）
#>
[CmdletBinding()]
param(
  [string]$HarnessDest = 'D:\OtherAPPS\deepseek-harness',
  [string]$DshHome = '',
  [switch]$SkipHarness,
  [switch]$SkipProfile,
  [switch]$SkipDotDsh,
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
$Self = $PSScriptRoot
if ([string]::IsNullOrWhiteSpace($DshHome)) { $DshHome = Join-Path $env:USERPROFILE '.dsh' }

function Say($m) { Write-Host "[setup] $m" -ForegroundColor Green }
function Warn($m) { Write-Host "[warn ] $m" -ForegroundColor Yellow }
function Die($m) { Write-Host "[error] $m" -ForegroundColor Red; exit 1 }
function RunStep($desc, [scriptblock]$body) {
  Say "==> $desc"
  if ($DryRun) { Say '    [dry-run] 跳过执行'; return }
  & $body
  if ($LASTEXITCODE -ne 0) { Die "步骤失败（退出码 $LASTEXITCODE）：$desc" }
}

# ── 0. 前置检查 ──────────────────────────────────────────────────────────
Say "套件目录：$Self"
Say "harness 目标：$HarnessDest"
Say "~/.dsh 目标：$DshHome"
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Die '未找到 node。请先运行：powershell -ExecutionPolicy Bypass -File .\install-prereqs.ps1（免管理员安装 Node+pnpm）'
}
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  Die '未找到 pnpm。请先运行：powershell -ExecutionPolicy Bypass -File .\install-prereqs.ps1（免管理员安装 Node+pnpm）'
}
if (-not (Get-Command tar -ErrorAction SilentlyContinue)) {
  Die '未找到 tar（Windows 10 1803+ 自带；若缺失请安装 Windows 版 tar/7-Zip 并加入 PATH）。'
}
Say ("node " + (node --version) + " / pnpm " + (pnpm --version))

# ── 1. 解压 harness checkout ─────────────────────────────────────────────
if (-not $SkipHarness) {
  $tarball = Join-Path $Self 'harness-src\deepseek-harness.tar.gz'
  if (-not (Test-Path $tarball)) { Die "缺少 $tarball —— 套件不完整，请重新导出。" }
  if (Test-Path (Join-Path $HarnessDest 'package.json')) {
    Warn "目标目录 $HarnessDest 已有内容，跳过解压（如需强制重装请先手动删除该目录）。"
  } else {
    $parent = Split-Path $HarnessDest -Parent
    $leaf = Split-Path $HarnessDest -Leaf
    New-Item -ItemType Directory -Force -Path $parent | Out-Null
    if (-not $DryRun) {
      Say "解压 harness 到 $parent ..."
      tar -xzf $tarball -C $parent
      if ($LASTEXITCODE -ne 0) { Die '解压失败，请检查磁盘空间与套件完整性。' }
      if ($leaf -ne 'deepseek-harness') {
        if (Test-Path $HarnessDest) { Remove-Item $HarnessDest -Recurse -Force }
        Rename-Item (Join-Path $parent 'deepseek-harness') $leaf
      }
      Say "harness 已就位于 $HarnessDest"
    }
  }

  # ── 2. 安装 launch 脚本（改写硬编码路径）──────────────────────────────
  $bat = [IO.File]::ReadAllText((Join-Path $Self 'launch\launch-dsh.bat'))
  $bat = [regex]::Replace($bat, 'cd /d ".*?"', ('cd /d "' + $HarnessDest + '"'))
  if (-not $DryRun) {
    Copy-Item (Join-Path $Self 'launch\dsh-wait-ready.ps1') $HarnessDest -Force
    Copy-Item (Join-Path $Self 'launch\whale.ico') $HarnessDest -Force
    [IO.File]::WriteAllText((Join-Path $HarnessDest 'launch-dsh.bat'), $bat)
    Say "launch 脚本已安装到 $HarnessDest（启动路径已改写）"
  }

  # ── 3. harness 依赖 ────────────────────────────────────────────────────
  RunStep '安装 harness 依赖（pnpm install，首次需数分钟）' {
    Push-Location $HarnessDest
    pnpm install
    Pop-Location
  }
} else {
  Warn '跳过 harness 解压与依赖安装（-SkipHarness）'
}

# ── 4. profile 配置 + 插件 + skill-viewer 补丁 ───────────────────────────
if (-not $SkipProfile) {
  $profDir = Join-Path $DshHome 'profiles\web'
  New-Item -ItemType Directory -Force -Path $profDir | Out-Null
  if ($DryRun) {
    Say "将复制 profile 配置到 ${profDir}（bundles: base / web-app / skill-viewer / better-sidebar）"
  } else {
    foreach ($f in @('package.json', 'pnpm-workspace.yaml', 'pnpm-lock.yaml', 'cordis.yml', 'cordis.patch.yml')) {
      $src = Join-Path $Self ("profile-web\" + $f)
      if (Test-Path $src) { Copy-Item $src (Join-Path $profDir $f) -Force }
      else { Warn "套件缺少 $f，跳过" }
    }
    Say "profile 配置已复制到 ${profDir}（bundles: base / web-app / skill-viewer / better-sidebar）"
  }

  RunStep '安装 profile 插件依赖（dsh-better-sidebar + dsh-skill-viewer）' {
    Push-Location $profDir
    pnpm install
    Pop-Location
  }

  # ── 5. skill-viewer 断线重试补丁（覆盖式，版本锁定 v0.2.4）────────────
  $sv = Join-Path $profDir 'node_modules\dsh-skill-viewer\lib\client.js'
  if (Test-Path $sv) {
    if (-not $DryRun) {
      Copy-Item (Join-Path $Self 'skill-viewer-patch\client.js.patched') $sv -Force
      node --check $sv
      if ($LASTEXITCODE -ne 0) {
        Warn '补丁后 client.js 语法校验失败 —— skill-viewer 版本与套件不匹配（套件对应 v0.2.4）。补丁未生效，请核对版本。'
      } else {
        Say 'skill-viewer 断线重试补丁已应用（v0.2.4，list/content 只读重试）'
      }
    }
  } else {
    Warn "未找到 $sv —— skill-viewer 未安装成功，补丁跳过（请检查上一步网络）"
  }
} else {
  Warn '跳过 profile 配置（-SkipProfile）'
}

# ── 6. dot-dsh 资产（技能 / agent 预设 / 全局设置）───────────────────────
if (-not $SkipDotDsh) {
  foreach ($d in @('skills', '.agent-presets')) {
    $src = Join-Path $Self ("dot-dsh\" + $d)
    $dst = Join-Path $DshHome $d
    if (Test-Path $src) {
      New-Item -ItemType Directory -Force -Path $dst | Out-Null
      if (-not $DryRun) {
        Get-ChildItem $src -Force | Copy-Item -Destination $dst -Recurse -Force
        Say "已复制 $d → $dst"
      }
    } else { Warn "套件缺少 dot-dsh\$d，跳过" }
  }
  $sy = Join-Path $Self 'dot-dsh\settings.yaml'
  $syd = Join-Path $DshHome 'settings.yaml'
  if (Test-Path $sy) {
    if (-not $DryRun) {
      if (Test-Path $syd) {
        $bak = $syd + '.bak-' + (Get-Date -Format 'yyyyMMdd-HHmmss')
        Copy-Item $syd $bak -Force
        Warn "目标机原有 settings.yaml 已备份为 $bak"
      }
      Copy-Item $sy $syd -Force
      Say 'settings.yaml 已复制（主题 / 默认模型等全局设置）'
    }
  }
} else {
  Warn '跳过 dot-dsh 资产（-SkipDotDsh）'
}

# ── 完成 ─────────────────────────────────────────────────────────────────
Say ''
Say '============================================================'
Say '安装完成！接下来：'
Say "  1) 配置 API 密钥：~/.dsh/.credentials.yaml 需重新填写（未随套件迁移，密钥不外传）"
Say "     或运行 dsh 命令按引导配置"
Say "  2) 启动：双击 $HarnessDest\launch-dsh.bat"
Say "     （脚本会等待服务就绪后自动打开浏览器 http://127.0.0.1:3080）"
Say '     手动方式：cd /d "$HarnessDest" 然后 pnpm dsh web'
Say '  3) 若启动报错，把终端输出发回给导出方排查'
Say '============================================================'
