import { noop } from '@babel/types';
import { computed, observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { Mandelbrot } from '../../game/fractal/Mandelbrot';
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
  resolution: number = 255;

  fractal = new Mandelbrot();
  zeroValue = 0;
  renderCallback: () => void = noop;

  renderer = new ProgressiveRenderer(this);

  @computed
  get fractalArea(): Size {
    const size = this.renderSize;
    const scale = this.scale.value;
    const minDim = Math.min(size.height, size.width);
    return {
      width: (2 * size.width * scale) / minDim,
      height: (2 * size.height * scale) / minDim,
    };
  }

  screenToFractal(x: number, y: number): Position {
    const area = this.fractalArea;
    const size = this.renderSize;
    return {
      x: ((x - size.width / 2) * area.width) / size.width,
      y: ((y - size.height / 2) * area.height) / size.height,
    };
  }

  render = () => {
    this.renderCallback();
  };

  getPixelValue = (x: number, y: number, _: Size) => {
    const { x: r, y: i } = this.screenToFractal(x, y);
    return this.fractal.calculate(r, i, this.resolution);
  };

  calculate = () => {
    this.renderer.calculate();
    this.render();
  };
}
