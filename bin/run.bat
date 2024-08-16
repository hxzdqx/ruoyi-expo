chcp 65001

@echo off
echo.
echo [提示] 运行...
echo.

%~d0
cd %~dp0

cd ..
call pnpm run start

pause