import { observer } from 'mobx-react';
import React from 'react';
import { BottomBar, UIContainer } from '../common/Components';
import ControlBar from '../common/ControlBar';
import FpsBar from '../common/FpsBar';
import FrameBar from '../common/FrameBar';
import SimulationView from '../common/SimulationView';
import ZoomBar from '../common/ZoomBar';
import { DebugDataView } from './DebugDataView';
import { LangtonModel } from './LangtonModel';
import { LangtonRenderer } from './LangtonRenderer';

const showDebug = false;

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
          {showDebug ? (
            <DebugDataView model={this.model} />
          ) : (
            <>
              <FrameBar model={this.model.control} />
              <FpsBar model={this.model.control} />
              <ZoomBar model={this.model} />
              <ControlBar control={this.model.control} />
            </>
          )}
        </BottomBar>
      </UIContainer>
    );
  }

  private createRenderer = (attachRef: React.RefObject<HTMLDivElement>) =>
    new LangtonRenderer(this.model, attachRef);
}
