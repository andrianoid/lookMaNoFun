import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  margin: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Title>Kart Racing Social Platform</Title>
      <Button onClick={() => navigate('/game')}>Play Now</Button>
      <Button onClick={() => navigate('/lobby')}>Join Lobby</Button>
    </HomeContainer>
  );
};

export default Home; 