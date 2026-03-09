import { action } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
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

type NavigateFn = (path: string, options?: { replace?: boolean }) => void;

@observer
class MandelbrotUIInner extends React.Component<{
  search: string;
  navigate: NavigateFn;
}> {
  private model = new FractalModel(
    new Mandelbrot(),
    { x: -0.8, y: 0 },
    '/p/mandelbrot'
  );

  componentDidMount() {
    this.updateModelParams();
  }

  componentDidUpdate() {
    this.updateModelParams();
  }

  render() {
    const center = this.model.modelCenter;
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

export default function MandelbrotUI() {
  const location = useLocation();
  const navigate = useNavigate();
  return <MandelbrotUIInner search={location.search} navigate={navigate} />;
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

const Link = styled.a`
  color: ${Colors.white};
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
`;
