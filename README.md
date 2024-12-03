# Kart Racing Social Platform

A web-based social gaming platform focused on multiplayer kart racing, built with React, TypeScript, and Three.js.

## Quick Installation

### Windows Users

1. Download the [`installation-scripts/install.bat`](install.bat) file
2. Right-click the file and select "Run as administrator"
3. Wait for the installation to complete (a browser window will open automatically)

### Mac/Linux Users

1. Download the [`installation-scripts/install.sh`](install.sh) file
2. Open Terminal
3. Navigate to the folder containing the downloaded file:
   ```bash
   cd /path/to/downloaded/file
   ```
4. Make the script executable and run it:
   ```bash
   chmod +x install.sh
   ./install.sh
   ```

The installation scripts will:
- Install Git if needed
- Install Node.js if needed
- Download the project
- Start the development server
- Open the project in your default browser

### Troubleshooting Installation

If you encounter any issues:
1. Make sure you're running the script with administrator privileges
2. Check your internet connection
3. Contact the project maintainer if problems persist

### Uninstalling

To remove the project:
1. Delete the project folder
2. Git and Node.js can be uninstalled through your system's program manager if desired

## Manual Installation

If you prefer to install manually, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. Clone the repository:
```bash
git clone [repository-url]
cd kart-racing-social-platform
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
# Make sure you're in the frontend directory
cd frontend  # if not already in frontend directory
npm run dev
```

The application will be available at `http://localhost:3000`

## Features

- Real-time multiplayer kart racing
- Social features including lobbies and chat
- Modern 3D graphics using Three.js
- Responsive design for various screen sizes

## Project Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   ├── game/          # Game-specific components and logic
│   ├── store/         # Redux store and slices
│   ├── styles/        # Global styles and themes
│   └── assets/        # Static assets
├── public/            # Public assets
└── package.json       # Dependencies and scripts
```

## Development

From the `frontend` directory:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- React 18
- TypeScript
- Three.js
- Redux Toolkit
- React Router
- Emotion (CSS-in-JS)
- Vite

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js community for 3D graphics resources
- React community for component examples and best practices