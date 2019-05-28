import { noop } from '@babel/types';
import { observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { ColorSlide } from '../../game/fractal/ColorSlide';
import { BoundValue } from '../../util/BoundValue';
import { Model } from '../common/Model';
import { PixelSource, ProgressiveRenderer } from './ProgressiveRenderer';

export class MandelbrotModel implements Model, PixelSource<number> {
  @observable
  renderSize: Size = { width: 1, height: 1 };

  @observable
  scale: BoundValue = { min: 0.3, max: 1.5, value: 1, step: 0.05 };

  @observable
  speed: BoundValue = { min: 1, max: 1, value: 1, step: 1 };

  @observable
  centerPoint: Position = { x: 0, y: 0 };

  @observable
  resolution: number = 100;

  fractal = new ColorSlide();
  zeroValue = 0;
  renderCallback: () => void = noop;

  renderer = new ProgressiveRenderer(this);

  render = () => {
    this.renderCallback();
  };

  getPixelValue = (x: number, y: number, size: Size) => {
    const r = (x / size.width - 0.5) * 4;
    const i = (y / size.height - 0.5) * 4;
    return this.fractal.calculate(r, i, this.resolution);
  };

  calculate = () => {
    this.renderer.calculate();
    this.render();
  };
}
