import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Home Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the title correctly', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText('Kart Racing Social Platform')).toBeInTheDocument();
  });

  it('renders Play Now and Join Lobby buttons', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText('Play Now')).toBeInTheDocument();
    expect(screen.getByText('Join Lobby')).toBeInTheDocument();
  });

  it('navigates to game when Play Now is clicked', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Play Now'));
    expect(mockNavigate).toHaveBeenCalledWith('/game');
  });

  it('navigates to lobby when Join Lobby is clicked', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Join Lobby'));
    expect(mockNavigate).toHaveBeenCalledWith('/lobby');
  });
}); 