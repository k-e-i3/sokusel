@echo off
chcp 65001
echo ---------------------------------------------------
echo SokuSelect サーバーを起動します...
echo 起動後、ブラウザで http://localhost:3000 を開いてください。
echo ---------------------------------------------------
call npx -y serve .
pause
