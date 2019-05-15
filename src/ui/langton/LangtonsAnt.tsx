import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import SimulationView from '../SimulationView';
import ControlBar from './ControlBar';
import FrameBar from './FrameBar';
import { LangtonModel } from './LangtonGame';

@observer
export default class LangtonsAnt extends React.Component<{}> {
  private model = new LangtonModel();

  render() {
    return (
      <Container>
        <SimulationView model={this.model} />
        <BottomBar>
          <FrameBar model={this.model} />
          <ControlBar model={this.model} />
        </BottomBar>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  width: 80%;
  max-width: 1200px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 32px;
`;

const BottomBar = styled.div`
  display: flex;
  width: 100%;
  margin-top: 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
