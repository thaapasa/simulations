import { observer } from 'mobx-react';
import React from 'react';
import { Route } from 'react-router';
import { ToolBar, UIContainer } from '../common/Components';
import ControlBar from '../common/ControlBar';
import FpsBar from '../common/FpsBar';
import FrameBar from '../common/FrameBar';
import PixiSimulationView from '../common/PixiSimulationView';
import SpeedBar from '../common/SpeedBar';
import TileDebugView from '../common/TileDebugView';
import ZoomBar from '../common/ZoomBar';
import UISelector from '../UISelector';
import { LangtonModel } from './LangtonModel';
import { LangtonRenderer } from './LangtonRenderer';

const showDebug = false;

@observer
export default class LangtonsAntUI extends React.Component<{}> {
  private model = new LangtonModel();

  render() {
    return (
      <UIContainer className="LangtonsAntUI">
        <ToolBar className="TopBar">
          <FrameBar model={this.model.control} />
          <Route component={UISelector} />
          <FpsBar model={this.model.control} />
        </ToolBar>
        <PixiSimulationView
          useDragPoint={false}
          model={this.model}
          createRenderer={this.createRenderer}
        />
        <ToolBar className="BottomBar">
          {showDebug ? (
            <TileDebugView model={this.model.tileCalc} />
          ) : (
            <>
              <SpeedBar model={this.model} />
              <ZoomBar model={this.model} />
              <ControlBar control={this.model.control} />
            </>
          )}
        </ToolBar>
      </UIContainer>
    );
  }

  private createRenderer = (attachRef: React.RefObject<HTMLDivElement>) =>
    new LangtonRenderer(this.model, attachRef);
}
