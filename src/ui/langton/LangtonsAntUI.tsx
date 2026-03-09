import { observer } from 'mobx-react';
import React, { useRef } from 'react';
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

const LangtonsAntUI = observer(() => {
  const modelRef = useRef(new LangtonModel());
  const model = modelRef.current;

  const createRenderer = (attachRef: React.RefObject<HTMLDivElement | null>) =>
    new LangtonRenderer(model, attachRef);

  return (
    <UIContainer className="LangtonsAntUI">
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
        {showDebug ? (
          <TileDebugView model={model.tileCalc} />
        ) : (
          <>
            <SpeedBar model={model} />
            <ZoomBar model={model} />
            <ControlBar control={model.control} />
          </>
        )}
      </ToolBar>
    </UIContainer>
  );
});

export default LangtonsAntUI;
