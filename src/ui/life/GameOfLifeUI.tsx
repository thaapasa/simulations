import { observer } from 'mobx-react';
import React, { useRef } from 'react';
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

const GameOfLifeUI = observer(() => {
  const modelRef = useRef(() => {
    const m = new GameOfLifeModel();
    m.grid.addMover();
    return m;
  });
  // Lazy init: only call the factory once
  if (typeof modelRef.current === 'function') {
    modelRef.current = modelRef.current() as any;
  }
  const model = modelRef.current as unknown as GameOfLifeModel;

  const createRenderer = (attachRef: React.RefObject<HTMLDivElement | null>) =>
    new GameOfLifeRenderer(model, attachRef);

  return (
    <UIContainer className="GameOfLifeUI">
      <ToolBar className="TopBar">
        <FrameBar model={model.control} />
        <UISelector />
        <FpsBar model={model.control} />
      </ToolBar>
      <PixiSimulationView
        useDragPoint={false}
        model={model}
        createRenderer={createRenderer}
      />
      <ToolBar className="BottomBar">
        <SpeedBar model={model} />
        <ZoomBar model={model} />
        <ControlBar control={model.control} />
      </ToolBar>
    </UIContainer>
  );
});

export default GameOfLifeUI;
