import { observer } from 'mobx-react';
import React from 'react';
import { BottomBar, UIContainer } from '../common/Components';
import ControlBar from './ControlBar';
import FpsBar from './FpsBar';
import FrameBar from './FrameBar';
import { LangtonModel } from './LangtonGame';
import SimulationView from './SimulationView';
import ZoomBar from './ZoomBar';

@observer
export default class LangtonsAntUI extends React.Component<{}> {
  private model = new LangtonModel();

  render() {
    return (
      <UIContainer className="LangtonsAntUI">
        <SimulationView model={this.model} scale={this.model.scale} />
        <BottomBar>
          <FrameBar model={this.model} />
          <FpsBar model={this.model} />
          <ZoomBar model={this.model} />
          <ControlBar model={this.model} />
        </BottomBar>
      </UIContainer>
    );
  }
}
