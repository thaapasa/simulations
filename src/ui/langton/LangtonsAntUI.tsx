import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { Colors } from '../Colors';
import { media } from '../Styles';
import ControlBar from './ControlBar';
import FpsBar from './FpsBar';
import FrameBar from './FrameBar';
import { LangtonModel } from './LangtonGame';
import SimulationView from './SimulationView';
import ZoomBar from './ZoomBar';

@observer
export default class LangtonsAnt extends React.Component<{}> {
  private model = new LangtonModel();

  render() {
    return (
      <Container className="LangtonsAntUI">
        <SimulationView model={this.model} scale={this.model.scale} />
        <BottomBar>
          <FrameBar model={this.model} />
          <FpsBar model={this.model} />
          <ZoomBar model={this.model} />
          <ControlBar model={this.model} />
        </BottomBar>
      </Container>
    );
  }

  renderDebugData() {
    return (
      <DebugData>
        {dump('Center', this.model.centerPoint)}
        {dump('Render area', this.model.renderArea)}
        {dump('Tile range', this.model.tileRange)}
        {dump('Grid offset', this.model.gridOffset)}
      </DebugData>
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
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 32px;
  margin: 0;

  ${media.mobile`
    padding: 16px;
  `}
`;

const BottomBar = styled.div`
  display: flex;
  width: 100%;
  margin-top: 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${media.mobilePortrait`
    flex-direction: column;
  `}
`;

const DebugData = styled.div`
  display: flex;
  flex-direction: column;
  color: ${Colors.white};
  font-size: 12px;
`;
