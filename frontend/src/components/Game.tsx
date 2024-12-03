import React from 'react';
import GameCanvas from '../game/GameCanvas';
import styled from '@emotion/styled';

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const GameHUD = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-family: Arial, sans-serif;
  z-index: 1;
`;

const Game: React.FC = () => {
  return (
    <GameContainer>
      <GameHUD>
        <h2>Score: 0</h2>
        <p>Lap: 1/3</p>
      </GameHUD>
      <GameCanvas />
    </GameContainer>
  );
};

export default Game; 