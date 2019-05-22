import React from 'react';
import styled from 'styled-components';
import LangtonsAnt from './ui/langton/LangtonsAntUI';

const App: React.FC = () => (
  <Container className="App">
    <LangtonsAnt />
  </Container>
);

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export default App;
