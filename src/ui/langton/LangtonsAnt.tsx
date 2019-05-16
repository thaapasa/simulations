import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { Colors } from '../Colors';
import SimulationView from '../SimulationView';
import ControlBar from './ControlBar';
import FrameBar from './FrameBar';
import { LangtonModel } from './LangtonGame';

@observer
export default class LangtonsAnt extends React.Component<{}> {
  private model = new LangtonModel();

  private ctr = 0;

  componentDidMount() {
    setInterval(this.tick, 30);
  }

  tick = () => {
    this.ctr++;
    this.model.centerPoint = {
      x: Math.sin(this.ctr / 23) * 100,
      y: Math.cos(this.ctr / 35) * 100,
    };
  };

  render() {
    return (
      <Container>
        <SimulationView model={this.model} />
        <BottomBar>
          <FrameBar model={this.model} />
          <DebugData>
            {dump('Center', this.model.centerPoint)}
            {dump('Render area', this.model.renderArea)}
            {dump('Tile range', this.model.tileRange)}
            {dump('Grid offset', this.model.gridOffset)}
          </DebugData>
          <ControlBar model={this.model} />
        </BottomBar>
      </Container>
    );
  }
}

const dump = (title: string, data: any) => (
  <div>
    {title}: {JSON.stringify(data)}
  </div>
);

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

const DebugData = styled.div`
  display: flex;
  flex-direction: column;
  color: ${Colors.white};
  font-size: 12px;
`;
