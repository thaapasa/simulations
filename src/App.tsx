import React from 'react';
import styled from 'styled-components';
import { FastForwardIcon, IconBar, PlayIcon, SkipIcon } from './ui/Icons';
import SimulationView from './ui/SimulationView';

const App: React.FC = () => {
  return (
    <Container>
      <SimulationView />
      <IconBar>
        <PlayIcon />
        <SkipIcon />
        <FastForwardIcon />
      </IconBar>
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
