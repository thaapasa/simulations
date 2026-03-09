import { observer } from 'mobx-react';
import React, { useCallback, useRef } from 'react';
import { ToolBar, UIContainer } from '../common/Components';
import ControlBar from '../common/ControlBar';
import FpsBar from '../common/FpsBar';
import FrameBar from '../common/FrameBar';
import PixiSimulationView from '../common/PixiSimulationView';
import SpeedBar from '../common/SpeedBar';
import ZoomBar from '../common/ZoomBar';
import UISelector from '../UISelector';
import BrushSelector from './BrushSelector';
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
  const simRef = useRef<HTMLDivElement>(null);

  const createRenderer = (attachRef: React.RefObject<HTMLDivElement | null>) =>
    new GameOfLifeRenderer(model, attachRef);

  const getSimPos = useCallback(
    (e: React.PointerEvent | React.MouseEvent) => {
      const rect = simRef.current?.getBoundingClientRect();
      if (!rect) return null;
      return model.screenToTile(e.clientX - rect.left, e.clientY - rect.top);
    },
    [model]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!model.canPaint || e.buttons !== 0) return;
      const tile = getSimPos(e);
      if (tile) model.setHoverTile(tile);
    },
    [model, getSimPos]
  );

  const handlePointerLeave = useCallback(() => {
    model.setHoverTile(null);
  }, [model]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!model.canPaint) return;
      const tile = getSimPos(e);
      if (tile) model.placeBrush(tile.x, tile.y);
    },
    [model, getSimPos]
  );

  return (
    <UIContainer className="GameOfLifeUI">
      <ToolBar className="TopBar">
        <FrameBar model={model.control} />
        <UISelector />
        <FpsBar model={model.control} />
      </ToolBar>
      <div
        ref={simRef}
        style={{ flex: 1, width: '100%', position: 'relative' }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <PixiSimulationView
          useDragPoint={false}
          model={model}
          createRenderer={createRenderer}
        />
      </div>
      <ToolBar className="BottomBar">
        <SpeedBar model={model} />
        <ZoomBar model={model} />
        <BrushSelector model={model} />
        <ControlBar control={model.control} />
      </ToolBar>
    </UIContainer>
  );
});

export default GameOfLifeUI;
