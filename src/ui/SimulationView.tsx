import React from 'react';
import styled from 'styled-components';
import { Colors } from './Colors';

const SimulationView: React.FC = () => {
  return <Container />;
};

export default SimulationView;

const Container = styled.div`
  margin: 32px;
  padding: 0;
  border: 2px solid ${Colors.black};
  border-radius: 8px;
  background-color: ${Colors.darkBlue};
  height: 300px;
`;
