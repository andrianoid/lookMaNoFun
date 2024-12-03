import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Mock the GameCanvas component to avoid Three.js issues in tests
jest.mock('../game/GameCanvas', () => {
  return function DummyGameCanvas() {
    return <div data-testid="game-canvas">Game Canvas Mock</div>;
  };
});

describe('App Routing', () => {
  const renderWithRouter = (initialEntries = ['/', '/game', '/lobby']) => {
    return render(<App router={(props) => <MemoryRouter initialEntries={[initialEntries[0]]} {...props} />} />);
  };

  it('renders home page by default', () => {
    renderWithRouter();
    expect(screen.getByText('Kart Racing Social Platform')).toBeInTheDocument();
  });

  it('navigates to game page', () => {
    renderWithRouter(['/game']);
    expect(screen.getByTestId('game-canvas')).toBeInTheDocument();
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
    expect(screen.getByText('Lap: 1/3')).toBeInTheDocument();
  });

  it('navigates to lobby page', () => {
    renderWithRouter(['/lobby']);
    expect(screen.getByText('Game Lobby')).toBeInTheDocument();
  });

  it('handles invalid routes by redirecting to home', () => {
    renderWithRouter(['/invalid-route']);
    // We should see the home page content since that's our fallback
    expect(screen.getByText('Kart Racing Social Platform')).toBeInTheDocument();
  });
}); 