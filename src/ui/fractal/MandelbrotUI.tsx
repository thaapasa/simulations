import { action, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Mandelbrot } from '../../game/fractal/Mandelbrot';
import { parseQueryString } from '../../util/QueryString';
import { Colors } from '../Colors';
import BoundValueView from '../common/BoundValueView';
import CanvasSimulationView from '../common/CanvasSimulationView';
import { ToolBar, UIContainer } from '../common/Components';
import FpsBar from '../common/FpsBar';
import ProgressBar from '../common/ProgressBar';
import ZoomBar from '../common/ZoomBar';
import UISelector from '../UISelector';
import { FractalModel } from './FractalModel';
import { FractalRenderer } from './FractalRenderer';
import ResolutionBar from './ResolutionBar';

const MandelbrotUI = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();

  const modelRef = useRef(
    new FractalModel(new Mandelbrot(), { x: -0.8, y: 0 }, '/p/mandelbrot')
  );
  const model = modelRef.current;

  useEffect(() => {
    const q = parseQueryString(location.search, Number);
    runInAction(() => {
      if (q.r && model.modelCenter.x !== q.r) model.modelCenter.x = q.r;
      if (q.i && model.modelCenter.y !== q.i) model.modelCenter.y = q.i;
      if (q.scale && model.scale.value !== q.scale) model.scale.value = q.scale;
      if (q.resolution && model.resolution.value !== q.resolution)
        model.resolution.value = q.resolution;
    });
  }, [location.search]);

  const createRenderer = (
    attachRef: React.RefObject<HTMLCanvasElement | null>
  ) => new FractalRenderer(model, attachRef, navigate);

  const center = model.modelCenter;

  return (
    <UIContainer className="MandelbrotUI">
      <ToolBar className="TopBar">
        <div />
        <UISelector />
        <div>
          <Link href={`/p/julia/${center.x}/${center.y}`}>Julia</Link>
        </div>
      </ToolBar>
      <CanvasSimulationView
        useDragPoint={true}
        model={model}
        createRenderer={createRenderer}
      />
      <ToolBar className="BottomBar">
        <Column>
          <ZoomBar model={model} />
          <ResolutionBar model={model} />
        </Column>
        <Column>
          <BoundValueView
            title="Palette 1"
            value={model.paletteStep1}
            onChange={model.repaint}
          />
          <BoundValueView
            title="Palette 2"
            value={model.paletteStep2}
            onChange={model.repaint}
          />
        </Column>
        <Column>
          <FpsBar model={model} />
          <ProgressBar model={model} />
        </Column>
      </ToolBar>
    </UIContainer>
  );
});

export default MandelbrotUI;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    margin-top: 8px;
  }
  & > div:first-child {
    margin-top: 0;
  }
`;

const Link = styled.a`
  color: ${Colors.white};
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
`;
