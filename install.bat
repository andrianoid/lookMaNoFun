// install.bat - For Windows Users
@echo off
echo Installing lookMaNoFun...

:: Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing Git...
    winget install --id Git.Git -e --source winget
    :: Update PATH
    set "PATH=%PATH%;C:\Program Files\Git\cmd"
)

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing Node.js...
    winget install OpenJS.NodeJS.LTS
    :: Update PATH
    set "PATH=%PATH%;C:\Program Files\nodejs"
)

:: Clone and setup project
echo Setting up project...
git clone https://github.com/andrianoid/lookMaNoFun.git
cd lookMaNoFun
call npm install

:: Start the development server
echo Starting development server...
start http://localhost:3000
npm run dev