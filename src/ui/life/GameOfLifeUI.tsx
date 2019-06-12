import { observer } from 'mobx-react';
import React from 'react';
import { Route } from 'react-router';
import { ToolBar, UIContainer } from '../common/Components';
import ControlBar from '../common/ControlBar';
import FpsBar from '../common/FpsBar';
import FrameBar from '../common/FrameBar';
import PixiSimulationView from '../common/PixiSimulationView';
import SpeedBar from '../common/SpeedBar';
import ZoomBar from '../common/ZoomBar';
import UISelector from '../UISelector';
import { GameOfLifeModel } from './GameOfLifeModel';
import { GameOfLifeRenderer } from './GameOfLifeRenderer';

@observer
export default class GameOfLifeUI extends React.Component<{}> {
  private model = new GameOfLifeModel();

  constructor(p: {}) {
    super(p);
    this.model.grid.addMover();
  }

  render() {
    return (
      <UIContainer className="GameOfLifeUI">
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
          <SpeedBar model={this.model} />
          <ZoomBar model={this.model} />
          <ControlBar control={this.model.control} />
        </ToolBar>
      </UIContainer>
    );
  }

  private createRenderer = (attachRef: React.RefObject<HTMLDivElement>) =>
    new GameOfLifeRenderer(this.model, attachRef);
}
