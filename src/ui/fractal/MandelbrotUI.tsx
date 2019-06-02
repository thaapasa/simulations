import { observer } from 'mobx-react';
import React from 'react';
import { Route } from 'react-router';
import { ToolBar, UIContainer } from '../common/Components';
import FpsBar from '../common/FpsBar';
import PixiSimulationView from '../common/PixiSimulationView';
import ZoomBar from '../common/ZoomBar';
import UISelector from '../UISelector';
import { MandelbrotModel } from './MandelbrotModel';
import { MandelbrotRenderer } from './MandelbrotRenderer';

@observer
export default class MandelbrotUI extends React.Component<{}> {
  private model = new MandelbrotModel();

  render() {
    return (
      <UIContainer className="MandelbrotUI">
        <ToolBar className="TopBar Center">
          <Route component={UISelector} />
        </ToolBar>
        <PixiSimulationView
          model={this.model}
          createRenderer={this.createRenderer}
        />
        <ToolBar className="BottomBar">
          <ZoomBar model={this.model} />
          <FpsBar model={this.model} />
        </ToolBar>
      </UIContainer>
    );
  }

  private createRenderer = (attachRef: React.RefObject<HTMLDivElement>) =>
    new MandelbrotRenderer(this.model, attachRef);
}
