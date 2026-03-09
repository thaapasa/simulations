import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Julia } from '../../game/fractal/Julia';
import { parseQueryString } from '../../util/QueryString';
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

const JuliaUI = observer(() => {
  const params = useParams<{ r: string; i: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const r = params.r || '0';
  const i = params.i || '0';

  const fractalRef = useRef(new Julia(Number(r), Number(i)));
  const modelRef = useRef(
    new FractalModel(fractalRef.current, { x: 0, y: 0 }, `/p/julia/${r}/${i}`)
  );
  const model = modelRef.current;

  useEffect(() => {
    const nr = Number(r);
    const ni = Number(i);
    if (nr !== fractalRef.current.r || ni !== fractalRef.current.i) {
      fractalRef.current = new Julia(nr, ni);
      model.updateSource(fractalRef.current, `/p/julia/${nr}/${ni}`);
    }

    const q = parseQueryString(location.search, Number);
    runInAction(() => {
      if (q.r && model.modelCenter.x !== q.r) model.modelCenter.x = q.r;
      if (q.i && model.modelCenter.y !== q.i) model.modelCenter.y = q.i;
      if (q.scale && model.scale.value !== q.scale) model.scale.value = q.scale;
      if (q.resolution && model.resolution.value !== q.resolution)
        model.resolution.value = q.resolution;
    });
  }, [r, i, location.search]);

  const createRenderer = (
    attachRef: React.RefObject<HTMLCanvasElement | null>
  ) => new FractalRenderer(model, attachRef, navigate);

  return (
    <UIContainer className="JuliaUI">
      <ToolBar className="TopBar Center">
        <UISelector />
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

export default JuliaUI;

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
