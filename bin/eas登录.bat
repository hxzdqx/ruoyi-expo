chcp 65001

@echo off
echo.
echo [提示] eas登录...
echo.

%~d0
cd %~dp0

cd ..
call eas login

pause