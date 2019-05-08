import React from 'react';
import styled from 'styled-components';
import SimulationView from './ui/SimulationView';

const App: React.FC = () => {
  return (
    <Container>
      <SimulationView />
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;
