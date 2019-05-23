import { observer } from 'mobx-react';
import React from 'react';
import { BottomBar, UIContainer } from '../common/Components';
import FpsBar from '../common/FpsBar';
import FrameBar from '../common/FrameBar';
import SimulationView from '../common/SimulationView';
import ZoomBar from '../common/ZoomBar';
import ControlBar from './ControlBar';
import { LangtonModel } from './LangtonModel';
import { LangtonRenderer } from './LangtonRenderer';

@observer
export default class LangtonsAntUI extends React.Component<{}> {
  private model = new LangtonModel();

  render() {
    return (
      <UIContainer className="LangtonsAntUI">
        <SimulationView
          model={this.model}
          scale={this.model.scale}
          createRenderer={this.createRenderer}
        />
        <BottomBar className="BottomBar">
          <FrameBar model={this.model.control} />
          <FpsBar model={this.model.control} />
          <ZoomBar model={this.model} />
          <ControlBar model={this.model} />
        </BottomBar>
      </UIContainer>
    );
  }

  private createRenderer = (attachRef: React.RefObject<HTMLDivElement>) =>
    new LangtonRenderer(this.model, attachRef);
}
