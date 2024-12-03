@echo off
setlocal enabledelayedexpansion

echo Kart Racing Social Platform Installer
echo ===================================
echo.

:: Check for administrator privileges
echo Checking administrator privileges...
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script requires administrator privileges.
    echo Please right-click and select "Run as administrator"
    pause
    exit /b 1
)
echo Administrator privileges confirmed.
echo.

:: Check and delete existing installation directory
echo Checking for existing installation...
if exist "%INSTALL_DIR%" (
    echo WARNING: Installation directory already exists at: %INSTALL_DIR%
    set /p CONFIRM="Do you want to delete the existing installation? (Y/N): "
    if /i "!CONFIRM!"=="Y" (
        echo Deleting existing installation...
        rd /s /q "%INSTALL_DIR%" || (
            echo ERROR: Failed to delete existing installation.
            echo Please close any open files or applications in the directory.
            pause
            exit /b 1
        )
        echo Existing installation deleted.
    ) else (
        echo Installation cancelled by user.
        pause
        exit /b 0
    )
)

:: Create installation directory
echo Creating installation directory...
set "INSTALL_DIR=%USERPROFILE%\kart-racing-platform"
if not exist "%INSTALL_DIR%" (
    mkdir "%INSTALL_DIR%" 2>nul
    if errorlevel 1 (
        echo ERROR: Failed to create installation directory.
        echo Please check if you have write permissions to %USERPROFILE%
        pause
        exit /b 1
    )
)
cd /d "%INSTALL_DIR%" || (
    echo ERROR: Failed to navigate to installation directory.
    pause
    exit /b 1
)
echo Installation directory ready: %INSTALL_DIR%
echo.

:: Check for Git
echo Checking for Git installation...
where git >nul 2>&1
if %errorLevel% neq 0 (
    echo Git not found. Installing Git...
    echo Downloading Git installer...
    powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/Git-2.42.0.2-64-bit.exe' -OutFile 'git-installer.exe'}" || (
        echo ERROR: Failed to download Git installer.
        echo Please check your internet connection.
        pause
        exit /b 1
    )
    echo Installing Git...
    start /wait git-installer.exe /VERYSILENT /NORESTART
    if errorlevel 1 (
        echo ERROR: Git installation failed.
        del git-installer.exe
        pause
        exit /b 1
    )
    del git-installer.exe
    :: Add Git to PATH for current session
    set "PATH=%PATH%;C:\Program Files\Git\cmd"
    :: Verify Git installation
    where git >nul 2>&1 || (
        echo ERROR: Git installation failed to add to PATH.
        pause
        exit /b 1
    )
)
echo Git is ready.
echo.

:: Check for Node.js
echo Checking for Node.js installation...
where node >nul 2>&1
if %errorLevel% neq 0 (
    echo Node.js not found. Installing Node.js...
    echo Downloading Node.js installer...
    powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://nodejs.org/dist/v18.18.0/node-v18.18.0-x64.msi' -OutFile 'node-installer.msi'}" || (
        echo ERROR: Failed to download Node.js installer.
        echo Please check your internet connection.
        pause
        exit /b 1
    )
    echo Installing Node.js...
    start /wait msiexec /i node-installer.msi /qn
    if errorlevel 1 (
        echo ERROR: Node.js installation failed.
        del node-installer.msi
        pause
        exit /b 1
    )
    del node-installer.msi
    :: Add Node.js to PATH for current session
    set "PATH=%PATH%;%PROGRAMFILES%\nodejs"
    :: Verify Node.js installation
    where node >nul 2>&1 || (
        echo ERROR: Node.js installation failed to add to PATH.
        pause
        exit /b 1
    )
)
echo Node.js is ready.
echo.

:: Clone the repository
echo Checking repository status...
if not exist ".git" (
    echo Cloning repository...
    git clone https://github.com/andrianoid/lookMaNoFun.git . || (
        echo ERROR: Failed to clone repository.
        echo Please check your internet connection and the repository URL.
        pause
        exit /b 1
    )
) else (
    echo Updating repository...
    git pull || (
        echo ERROR: Failed to update repository.
        echo Please check your internet connection.
        pause
        exit /b 1
    )
)
echo Repository is ready.
echo.

:: Verify frontend directory exists
if not exist "frontend" (
    echo ERROR: Frontend directory not found.
    echo Please check if the repository was cloned correctly.
    pause
    exit /b 1
)

:: Install dependencies
echo Installing frontend dependencies...
cd frontend || (
    echo ERROR: Failed to navigate to frontend directory.
    pause
    exit /b 1
)

:: Check if npm is available
where npm >nul 2>&1 || (
    echo ERROR: npm not found. Node.js installation may be incomplete.
    pause
    exit /b 1
)

call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies.
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)
echo Dependencies installed successfully.
echo.

:: Start the development server
echo Starting development server...
:: Verify we're in the frontend directory with package.json
if not exist "package.json" (
    echo ERROR: package.json not found in frontend directory.
    echo Current directory: %CD%
    pause
    exit /b 1
)

echo Starting npm...
start "" cmd /c "npm run dev && pause"
if errorlevel 1 (
    echo ERROR: Failed to start development server.
    pause
    exit /b 1
)

:: Wait for server to start
echo Waiting for server to start...
timeout /t 10 /nobreak >nul

:: Try to connect to the server
echo Checking if server is running...
powershell -Command "& {try { $response = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing; exit 0 } catch { exit 1 }}" >nul 2>&1
if errorlevel 1 (
    echo WARNING: Could not verify if server is running.
    echo The server might need more time to start.
)

:: Open in default browser
echo Opening in browser...
start http://localhost:3000

echo.
echo Installation complete! The game should open in your browser shortly.
echo If it doesn't open automatically, visit http://localhost:3000
echo.
echo Press any key to exit...
pause >nul 