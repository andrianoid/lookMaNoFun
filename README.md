# Kart Racing Social Platform

A web-based social gaming platform focused on multiplayer kart racing, built with React, TypeScript, and Three.js.

## Features

- Real-time multiplayer kart racing
- Social features including lobbies and chat
- Modern 3D graphics using Three.js
- Responsive design for various screen sizes

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

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
npm run dev
```

The application will be available at `http://localhost:3000`

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