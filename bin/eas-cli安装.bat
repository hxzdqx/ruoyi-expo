chcp 65001

@echo off
echo.
echo [提示] 安装EAS构建工具...
echo.

%~d0
cd %~dp0

cd ..
call pnpm add -g eas-cli

pause