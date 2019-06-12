import { observer } from 'mobx-react';
import React from 'react';
import { Route } from 'react-router';
import styled from 'styled-components';
import BoundValueView from '../common/BoundValueView';
import CanvasSimulationView from '../common/CanvasSimulationView';
import { ToolBar, UIContainer } from '../common/Components';
import FpsBar from '../common/FpsBar';
import ZoomBar from '../common/ZoomBar';
import UISelector from '../UISelector';
import { MandelbrotModel } from './MandelbrotModel';
import { MandelbrotRenderer } from './MandelbrotRenderer';
import ResolutionBar from './ResolutionBar';

@observer
export default class MandelbrotUI extends React.Component<{}> {
  private model = new MandelbrotModel();

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
          <FpsBar model={this.model} />
        </ToolBar>
      </UIContainer>
    );
  }

  private createRenderer = (attachRef: React.RefObject<HTMLCanvasElement>) =>
    new MandelbrotRenderer(this.model, attachRef);
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
