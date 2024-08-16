chcp 65001

@echo off
echo.
echo [提示] 安卓打包...
echo.

%~d0
cd %~dp0

cd ..
call eas build --platform android

pause