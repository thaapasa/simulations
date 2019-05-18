import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { Size } from '../game/common/Size';
import { Colors } from './Colors';
import { LangtonModel } from './langton/LangtonGame';
import { LangtonRenderer } from './langton/LangtonRenderer';
import { SizeAware } from './SizeAware';

@observer
class PixiSimulationView extends React.Component<{
  size: Size;
  model: LangtonModel;
}> {
  private containerRef = React.createRef<HTMLDivElement>();
  private renderer = new LangtonRenderer(this.props.model);
  private initialized = false;

  componentDidMount() {
    this.updateSize();
    this.renderGraphics();
    this.props.model.renderCallback = this.renderer.render;
  }

  componentDidUpdate() {
    this.updateSize();
    if (this.containerRef.current && !this.initialized) {
      console.log('Appending');
      this.containerRef.current.appendChild(this.renderer.app.view);
      this.initialized = true;
    }
  }

  render() {
    return (
      <Container>
        <div ref={this.containerRef} />
      </Container>
    );
  }

  renderGraphics = () => {
    this.renderer.render();
  };

  private updateSize = () => {
    this.renderer.updateSize(this.props.size);
  };
}

const SizedSimulationView = SizeAware(PixiSimulationView);
const StyledSimulationView = styled(SizedSimulationView)`
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 2px solid ${Colors.black};
  border-radius: 8px;
  background-color: ${Colors.darkBlue};
  overflow: hidden;
`;

export default StyledSimulationView;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
