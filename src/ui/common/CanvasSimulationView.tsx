import { observer } from 'mobx-react';
import React from 'react';
import { Size } from '../../game/common/Size';
import { SizeAware } from '../SizeAware';
import { Model } from './Model';
import { ModelMover } from './ModelMover';
import { ModelRenderer } from './ModelRenderer';
import { stylizeSimulationView } from './SimulationView';

@observer
class PlainCanvasSimulationView extends React.Component<{
  size: Size;
  model: Model;
  createRenderer: (
    containerRef: React.RefObject<HTMLCanvasElement>
  ) => ModelRenderer<void>;
}> {
  private containerRef = React.createRef<HTMLCanvasElement>();
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
        <canvas
          ref={this.containerRef}
          width={this.props.size.width}
          height={this.props.size.height}
        />
      </ModelMover>
    );
  }
}

const SizedCanvasSimulationView = SizeAware(PlainCanvasSimulationView);
const CanvasSimulationView = stylizeSimulationView(SizedCanvasSimulationView);

export default CanvasSimulationView;
