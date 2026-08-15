@echo off
title DeepSeek Harness Launcher
cd /d "D:\OtherAPPS\deepseek-harness"
start "DeepSeek Harness Server" /min cmd /k "call pnpm dsh web"
rem Wait until the server is ready instead of a fixed delay: boot time varies
rem with profile bundles / cold cache. The browser then opens to a live page.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0dsh-wait-ready.ps1"
start "" http://127.0.0.1:3080
exit
