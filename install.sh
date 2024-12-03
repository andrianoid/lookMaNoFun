# install.sh - For Mac/Linux Users
#!/bin/bash
echo "Installing lookMaNoFun..."

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Installing Git..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        brew install git
    else
        # Linux
        sudo apt-get update
        sudo apt-get install -y git
    fi
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install node
    else
        # Linux
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
fi

# Clone and setup project
echo "Setting up project..."
git clone https://github.com/andrianoid/lookMaNoFun.git
cd lookMaNoFun
npm install

# Start the development server
echo "Starting development server..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:3000
else
    xdg-open http://localhost:3000
fi
npm run dev