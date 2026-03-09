import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef } from 'react';
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
  const isPainting = useRef(false);

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

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!model.canDragPaint) return;
      isPainting.current = true;
      const tile = getSimPos(e);
      if (tile) {
        model.setHoverTile(tile);
        model.placeBrush(tile.x, tile.y, true);
      }
    },
    [model, getSimPos]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!model.canPaint) return;
      const tile = getSimPos(e);
      if (!tile) return;

      if (isPainting.current && model.canDragPaint) {
        model.setHoverTile(tile);
        model.placeBrush(tile.x, tile.y, true);
      } else if (e.buttons === 0) {
        model.setHoverTile(tile);
      }
    },
    [model, getSimPos]
  );

  const handlePointerUp = useCallback(() => {
    isPainting.current = false;
  }, []);

  const handlePointerLeave = useCallback(() => {
    isPainting.current = false;
    model.setHoverTile(null);
  }, [model]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!model.canPaint || model.canDragPaint) return;
      const tile = getSimPos(e);
      if (tile) model.placeBrush(tile.x, tile.y);
    },
    [model, getSimPos]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === 'r' || e.key === 'R') {
        model.rotateBrush();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [model]);

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
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <PixiSimulationView
          useDragPoint={false}
          model={model}
          createRenderer={createRenderer}
          dragEnabled={!model.canDragPaint}
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
