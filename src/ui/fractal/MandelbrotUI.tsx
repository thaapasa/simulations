import { observer } from 'mobx-react';
import React from 'react';
import { Route } from 'react-router';
import { ToolBar, UIContainer } from '../common/Components';
import SimulationView from '../common/SimulationView';
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
        <ToolBar className="TopBar">
          <Route component={UISelector} />
        </ToolBar>
        <SimulationView
          model={this.model}
          createRenderer={this.createRenderer}
        />
        <ToolBar className="BottomBar">
          <ZoomBar model={this.model} />
        </ToolBar>
      </UIContainer>
    );
  }

  private createRenderer = (attachRef: React.RefObject<HTMLDivElement>) =>
    new MandelbrotRenderer(this.model, attachRef);
}
