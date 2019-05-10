import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { FastForwardIcon, IconBar, PlayIcon, SkipIcon } from './Icons';
import { LangtonModel } from './langton/LangtonGame';
import SimulationView from './SimulationView';

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
        <IconBar>
          <PlayIcon />
          <SkipIcon onClick={this.model.step} />
          <FastForwardIcon />
        </IconBar>
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
