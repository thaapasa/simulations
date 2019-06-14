import { action } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { parseQueryString } from '../../util/QueryString';
import BoundValueView from '../common/BoundValueView';
import CanvasSimulationView from '../common/CanvasSimulationView';
import { ToolBar, UIContainer } from '../common/Components';
import FpsBar from '../common/FpsBar';
import ProgressBar from '../common/ProgressBar';
import ZoomBar from '../common/ZoomBar';
import UISelector from '../UISelector';
import { MandelbrotModel } from './MandelbrotModel';
import { MandelbrotRenderer } from './MandelbrotRenderer';
import ResolutionBar from './ResolutionBar';

@observer
export default class MandelbrotUI extends React.Component<
  RouteComponentProps<{}>
> {
  private model = new MandelbrotModel();

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
          <Route component={UISelector} />
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
    const q = parseQueryString(this.props.location.search, Number);
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

  private createRenderer = (attachRef: React.RefObject<HTMLCanvasElement>) =>
    new MandelbrotRenderer(this.model, attachRef, this.props.history);
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
