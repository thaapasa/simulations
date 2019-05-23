import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { Size } from '../../game/common/Size';
import { Colors } from '../Colors';
import { SizeAware } from '../SizeAware';
import { Model } from './Model';
import { ModelMover } from './ModelMover';
import { ModelRenderer } from './ModelRenderer';

@observer
class SimulationView extends React.Component<{
  size: Size;
  model: Model;
  createRenderer: (
    containerRef: React.RefObject<HTMLDivElement>
  ) => ModelRenderer;
  scale: number;
}> {
  private containerRef = React.createRef<HTMLDivElement>();
  private renderer = this.props.createRenderer(this.containerRef);

  componentDidMount() {
    this.updateSize();
    this.renderer.render();
    this.props.model.renderCallback = this.renderer.render;
  }

  componentDidUpdate() {
    this.updateSize();
  }

  render() {
    return (
      <ModelMover model={this.props.model}>
        <div ref={this.containerRef} />
      </ModelMover>
    );
  }

  private updateSize = () => {
    this.renderer.updateSize(this.props.size);
  };
}

const SizedSimulationView = SizeAware(SimulationView);
const StyledSimulationView = styled(SizedSimulationView)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 2px solid ${Colors.black};
  border-radius: 8px;
  background-color: ${Colors.darkBlue};
  overflow: hidden;
  height: 100%;
`;

export default StyledSimulationView;
