import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import * as PIXI from 'pixi.js';
import React from 'react';
import styled from 'styled-components';
import { Size, sizeEquals } from '../game/common/Size';
import ant from '../icons/ant.svg';
import { Colors, HexColors } from './Colors';
import { LangtonModel } from './langton/LangtonGame';
import { tileSize } from './langton/Tiles';
import { SizeAware } from './SizeAware';

const antSprite = PIXI.Sprite.from(ant);

@observer
class PixiSimulationView extends React.Component<{
  size: Size;
  model: LangtonModel;
}> {
  private containerRef = React.createRef<HTMLDivElement>();
  private app: PIXI.Application | undefined;

  componentDidMount() {
    this.updateSize();
    this.renderGraphics();
    this.props.model.renderCallback = this.renderGraphics;
  }

  componentDidUpdate() {
    this.updateSize();
  }

  render() {
    return (
      <Container>
        <div ref={this.containerRef} />
      </Container>
    );
  }

  createPixi() {
    if (!this.containerRef.current) {
      return;
    }
    if (this.app) {
      this.app.destroy();
    }

    const { model } = this.props;
    const size = model.drawAreaSize;
    const resolution = 1;
    console.log('Creating PIXI of size', toJS(size), 'resolution', resolution);
    const app = new PIXI.Application({
      width: size.width,
      height: size.height,
      backgroundColor: HexColors.darkBlue,
      resolution,
    });
    this.containerRef.current.appendChild(app.view);
    this.app = app;
  }

  renderGraphics = () => {
    if (!this.app) {
      return;
    }
    const model = this.props.model;
    console.log('Rendering frame', model.frame);
    const renderArea = model.drawAreaSize;
    const antPosition = model.antPosition;
    antSprite.x = renderArea.width / 2 + antPosition.x * tileSize;
    antSprite.y = renderArea.height / 2 - antPosition.y * tileSize;
    this.app.stage.addChild(antSprite);
  };

  private updateSize = () => {
    if (this.props.size.height > 0 && this.props.size.width > 0) {
      if (!sizeEquals(this.props.model.drawAreaSize, this.props.size)) {
        this.props.model.drawAreaSize = this.props.size;
        this.createPixi();
      }
    }
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
