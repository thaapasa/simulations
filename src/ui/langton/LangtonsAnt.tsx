import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import SimulationView from '../SimulationView';
import ControlBar from './ControlBar';
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
        <ControlBar model={this.model} />
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
