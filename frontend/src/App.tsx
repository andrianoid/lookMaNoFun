import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import Lobby from './components/Lobby';
import GlobalStyles from './styles/GlobalStyles';

interface AppProps {
  router?: React.ComponentType<{ children: React.ReactNode }>;
}

const App: React.FC<AppProps> = ({ router: RouterComponent = Router }) => {
  return (
    <RouterComponent>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </RouterComponent>
  );
};

export default App; 