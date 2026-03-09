import { action } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
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

type NavigateFn = (path: string, options?: { replace?: boolean }) => void;

@observer
class JuliaUIInner extends React.Component<{
  r: string;
  i: string;
  search: string;
  navigate: NavigateFn;
}> {
  private fractal = new Julia(0, 0);
  private model = new FractalModel(
    this.fractal,
    { x: 0, y: 0 },
    '/p/julia/0/0'
  );

  componentDidMount() {
    this.updateModelParams();
  }

  componentDidUpdate() {
    this.updateModelParams();
  }

  render() {
    return (
      <UIContainer className="MandelbrotUI">
        <ToolBar className="TopBar Center">
          <UISelector />
        </ToolBar>
        <CanvasSimulationView
          useDragPoint={true}
          model={this.model}
          createRenderer={this.createRenderer}
        />
        <ToolBar className="BottomBar">
          <Column>
            <ZoomBar model={this.model} />
            <ResolutionBar model={this.model} />
          </Column>
          <Column>
            <BoundValueView
              title="Palette 1"
              value={this.model.paletteStep1}
              onChange={this.model.repaint}
            />
            <BoundValueView
              title="Palette 2"
              value={this.model.paletteStep2}
              onChange={this.model.repaint}
            />
          </Column>
          <Column>
            <FpsBar model={this.model} />
            <ProgressBar model={this.model} />
          </Column>
        </ToolBar>
      </UIContainer>
    );
  }

  @action
  private updateModelParams = () => {
    const { r, i } = this.props;
    const nr = Number(r);
    const ni = Number(i);
    if (nr !== this.fractal.r || ni !== this.fractal.i) {
      this.fractal = new Julia(nr, ni);
      this.model.updateSource(this.fractal, `/p/julia/${nr}/${ni}`);
    }

    const q = parseQueryString(this.props.search, Number);
    if (q.r && this.model.modelCenter.x !== q.r) {
      this.model.modelCenter.x = q.r;
    }
    if (q.i && this.model.modelCenter.y !== q.i) {
      this.model.modelCenter.y = Number(q.i);
    }
    if (q.scale && this.model.scale.value !== q.scale) {
      this.model.scale.value = Number(q.scale);
    }
    if (q.resolution && this.model.resolution.value !== q.resolution) {
      this.model.resolution.value = Number(q.resolution);
    }
  };

  private createRenderer = (attachRef: React.RefObject<HTMLCanvasElement | null>) =>
    new FractalRenderer(this.model, attachRef, this.props.navigate);
}

export default function JuliaUI() {
  const params = useParams<{ r: string; i: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <JuliaUIInner
      r={params.r || '0'}
      i={params.i || '0'}
      search={location.search}
      navigate={navigate}
    />
  );
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    margin-top: 8px;
  }
  & > div:first {
    margin-top: 0;
  }
`;
