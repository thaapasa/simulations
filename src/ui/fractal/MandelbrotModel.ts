import { noop } from '@babel/types';
import { computed, observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { Mandelbrot } from '../../game/fractal/Mandelbrot';
import { BoundValue } from '../../util/BoundValue';
import { ByteColors } from '../Colors';
import { Model } from '../common/Model';
import { Palette, PrecalcColor, precalcColors } from '../Palette';
import { PixelSource, ProgressiveRenderer } from './ProgressiveRenderer';

export class MandelbrotModel implements Model, PixelSource<number> {
  @observable
  renderSize: Size = { width: 1, height: 1 };

  @observable
  scale = new BoundValue(1, 0.3, 100, 0.05);

  @observable
  speed = new BoundValue(1, 1, 1, 1);

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
  resolution: BoundValue = new BoundValue(10, 1, 100, 1, n => n * n);

  @observable
  paletteStep1: BoundValue = new BoundValue(0.07, 0, 1, 0.01);
  @observable
  paletteStep2: BoundValue = new BoundValue(0.6, 0, 1, 0.01);

  @computed
  get paletteStep3(): number {
    const p1 = this.paletteStep1.converted;
    const p2 = this.paletteStep2.converted;
    return Math.abs((p2 - p1) * 0.3 + p1);
  }

  @computed
  get palette(): Palette {
    const p1 = this.paletteStep1.converted;
    const p2 = this.paletteStep2.converted;
    const p3 = this.paletteStep3;
    if (p1 < p2) {
      return [
        { position: 0, color: ByteColors.black },
        { position: p1, color: ByteColors.darkBlue },
        { position: p3, color: ByteColors.darkRed },
        { position: p2, color: ByteColors.lightRed },
        { position: 1, color: ByteColors.white },
      ];
    } else {
      return [
        { position: 0, color: ByteColors.black },
        { position: p2, color: ByteColors.darkBlue },
        { position: p3, color: ByteColors.darkRed },
        { position: p1, color: ByteColors.lightRed },
        { position: 1, color: ByteColors.white },
      ];
    }
  }

  fractal = new Mandelbrot();
  zeroValue = 0;
  renderCallback: () => void = noop;

  @computed
  get fps(): number {
    return this.renderer.fps;
  }

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
    const scale = Math.pow(2, this.scale.value) / 2;
    return 2 / scale / this.screenMinDimension;
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

  @computed
  get colorProvider(): PrecalcColor {
    return precalcColors(this.resolution.converted, this.palette);
  }

  screenToFractal(x: number, y: number): Position {
    return this.screenToFractalCalc(
      x,
      y,
      this.fractalArea,
      this.renderSize,
      this.modelCenter
    );
  }

  screenToFractalCalc(
    x: number,
    y: number,
    area: Size,
    size: Size,
    offset: Position
  ): Position {
    return {
      x: ((x - size.width / 2) * area.width) / size.width + offset.x,
      y: ((y - size.height / 2) * area.height) / size.height + offset.y,
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

  getPixelValue = (
    x: number,
    y: number,
    area: Size,
    size: Size,
    offset: Position
  ) => {
    const { x: r, y: i } = this.screenToFractalCalc(x, y, area, size, offset);
    return this.fractal.calculate(r, i, this.resolution.converted);
  };

  calculate = () => {
    this.renderer.calculate();
    this.repaint();
  };
}
