chcp 65001

@echo off
echo.
echo [提示] 安装依赖...
echo.

%~d0
cd %~dp0

cd ..
call eas build:configure

pause