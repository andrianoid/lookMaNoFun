import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const LobbyContainer = styled.div`
  padding: 2rem;
  background: #f5f5f5;
  min-height: 100vh;
  font-family: Arial, sans-serif;
`;

const LobbyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const RoomList = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const Room = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

interface GameRoom {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  status: 'waiting' | 'playing';
}

const Lobby: React.FC = () => {
  const navigate = useNavigate();
  const [rooms] = useState<GameRoom[]>([
    {
      id: '1',
      name: 'Beginner Race',
      players: 2,
      maxPlayers: 4,
      status: 'waiting'
    },
    {
      id: '2',
      name: 'Pro Circuit',
      players: 3,
      maxPlayers: 4,
      status: 'playing'
    }
  ]);

  return (
    <LobbyContainer>
      <LobbyHeader>
        <h1>Game Lobby</h1>
        <div>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
          <Button style={{ marginLeft: '1rem' }}>Create Room</Button>
        </div>
      </LobbyHeader>

      <RoomList>
        {rooms.map(room => (
          <Room key={room.id}>
            <h3>{room.name}</h3>
            <p>Players: {room.players}/{room.maxPlayers}</p>
            <p>Status: {room.status}</p>
            <Button 
              disabled={room.status === 'playing' || room.players === room.maxPlayers}
              onClick={() => navigate('/game')}
            >
              Join Room
            </Button>
          </Room>
        ))}
      </RoomList>
    </LobbyContainer>
  );
};

export default Lobby; 