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

  componentDidMount() {
    this.model.updateGrid();
  }

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
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const BottomBar = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
