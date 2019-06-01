import { observer } from 'mobx-react';
import * as PIXI from 'pixi.js';
import React from 'react';
import { Size } from '../../game/common/Size';
import { SizeAware } from '../SizeAware';
import { Model } from './Model';
import { ModelMover } from './ModelMover';
import { ModelRenderer } from './ModelRenderer';
import { stylizeSimulationView } from './SimulationView';

@observer
class PlainPixiSimulationView extends React.Component<{
  size: Size;
  model: Model;
  createRenderer: (
    containerRef: React.RefObject<HTMLDivElement>
  ) => ModelRenderer<PIXI.Application>;
}> {
  private containerRef = React.createRef<HTMLDivElement>();
  private renderer = this.props.createRenderer(this.containerRef);

  componentDidMount() {
    this.props.model.renderCallback = this.renderer.render;
    this.renderer.updateSize(this.props.size);
    this.renderer.render();
  }

  componentDidUpdate() {
    this.renderer.updateSize(this.props.size);
  }

  render() {
    return (
      <ModelMover model={this.props.model}>
        <div ref={this.containerRef} />
      </ModelMover>
    );
  }
}

const SizedPixiSimulationView = SizeAware(PlainPixiSimulationView);
const PixiSimulationView = stylizeSimulationView(SizedPixiSimulationView);

export default PixiSimulationView;
