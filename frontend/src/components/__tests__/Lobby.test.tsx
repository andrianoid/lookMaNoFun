import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Lobby from '../Lobby';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Lobby Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the lobby header', () => {
    render(
      <BrowserRouter>
        <Lobby />
      </BrowserRouter>
    );
    expect(screen.getByText('Game Lobby')).toBeInTheDocument();
  });

  it('displays the correct number of rooms', () => {
    render(
      <BrowserRouter>
        <Lobby />
      </BrowserRouter>
    );
    const rooms = screen.getAllByRole('heading', { level: 3 });
    expect(rooms).toHaveLength(2);
    expect(screen.getByText('Beginner Race')).toBeInTheDocument();
    expect(screen.getByText('Pro Circuit')).toBeInTheDocument();
  });

  it('shows correct player counts for rooms', () => {
    render(
      <BrowserRouter>
        <Lobby />
      </BrowserRouter>
    );
    expect(screen.getByText('Players: 2/4')).toBeInTheDocument();
    expect(screen.getByText('Players: 3/4')).toBeInTheDocument();
  });

  it('disables join button for full or playing rooms', () => {
    render(
      <BrowserRouter>
        <Lobby />
      </BrowserRouter>
    );
    const joinButtons = screen.getAllByText('Join Room');
    expect(joinButtons[1]).toBeDisabled(); // Pro Circuit room (playing)
  });

  it('navigates back to home when Back to Home is clicked', () => {
    render(
      <BrowserRouter>
        <Lobby />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Back to Home'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigates to game when Join Room is clicked', () => {
    render(
      <BrowserRouter>
        <Lobby />
      </BrowserRouter>
    );
    const joinButtons = screen.getAllByText('Join Room');
    fireEvent.click(joinButtons[0]); // Click first room's join button
    expect(mockNavigate).toHaveBeenCalledWith('/game');
  });
}); 