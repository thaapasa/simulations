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
  scale: BoundValue = { min: 0.3, max: 100, value: 1, step: 0.05 };

  @observable
  speed: BoundValue = { min: 1, max: 1, value: 1, step: 1 };

  get centerPoint(): Position {
    const p = this.modelCenter;
    const ratio = this.fractalScreenRatio;
    const center = { x: p.x / ratio, y: p.y / ratio };
    return center;
  }

  set centerPoint(p: Position) {
    const ratio = this.fractalScreenRatio;
    this.modelCenter = { x: p.x * ratio, y: p.y * ratio };
  }

  @observable
  resolution: number = 255;

  fractal = new Mandelbrot();
  zeroValue = 0;
  renderCallback: () => void = noop;

  @observable
  modelCenter: Position = { x: -0.8, y: 0 };

  renderer = new ProgressiveRenderer(this);

  @computed
  get screenMinDimension(): number {
    const { width, height } = this.renderSize;
    return Math.min(width, height);
  }

  @computed
  get fractalScreenRatio(): number {
    return 2 / this.scale.value / this.screenMinDimension;
  }

  @computed
  get fractalArea(): Size {
    const size = this.renderSize;
    const ratio = this.fractalScreenRatio;
    return {
      width: size.width * ratio,
      height: size.height * ratio,
    };
  }

  screenToFractal(x: number, y: number): Position {
    const area = this.fractalArea;
    const size = this.renderSize;
    const offs = this.modelCenter;
    return {
      x: ((x - size.width / 2) * area.width) / size.width + offs.x,
      y: ((y - size.height / 2) * area.height) / size.height + offs.y,
    };
  }

  fractalToScreen(r: number, i: number): Position {
    const area = this.fractalArea;
    const size = this.renderSize;
    const offs = this.modelCenter;
    return {
      x: ((r - offs.x - area.width / 2) * size.width) / area.width,
      y: ((i - offs.y - area.height / 2) * size.height) / area.height,
    };
  }

  render = () => {
    this.calculate();
  };

  repaint = () => {
    this.renderCallback();
  };

  getPixelValue = (x: number, y: number, _: Size) => {
    const { x: r, y: i } = this.screenToFractal(x, y);
    return this.fractal.calculate(r, i, this.resolution);
  };

  calculate = () => {
    this.renderer.calculate();
    this.repaint();
  };
}
