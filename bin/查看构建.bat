chcp 65001

@echo off
echo.
echo [提示] 查看构建...
echo.

%~d0
cd %~dp0

cd ..
call eas build:list

pause