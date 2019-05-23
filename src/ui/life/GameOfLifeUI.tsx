import { observer } from 'mobx-react';
import React from 'react';
import { BottomBar, UIContainer } from '../common/Components';
import ControlBar from '../common/ControlBar';
import FpsBar from '../common/FpsBar';
import FrameBar from '../common/FrameBar';
import SimulationView from '../common/SimulationView';
import ZoomBar from '../common/ZoomBar';
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
        <SimulationView
          model={this.model}
          scale={this.model.scale}
          createRenderer={this.createRenderer}
        />
        <BottomBar className="BottomBar">
          <FrameBar model={this.model.control} />
          <FpsBar model={this.model.control} />
          <ZoomBar model={this.model} />
          <ControlBar control={this.model.control} />
        </BottomBar>
      </UIContainer>
    );
  }

  private createRenderer = (attachRef: React.RefObject<HTMLDivElement>) =>
    new GameOfLifeRenderer(this.model, attachRef);
}
