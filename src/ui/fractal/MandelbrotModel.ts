import { noop } from '@babel/types';
import { observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { Mandelbrot } from '../../game/fractal/ColorSlide';
import { BoundValue } from '../../util/BoundValue';
import { Model } from '../common/Model';

export class MandelbrotModel implements Model {
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

  pixels: number[][] = [];

  fractal = new Mandelbrot();

  renderCallback: () => void = noop;

  render = () => {
    this.renderCallback();
  };

  resetPixels = () => {
    console.log('Reset pixels');
    this.pixels = [];
    const size = this.renderSize;
    for (let x = 0; x < size.width; ++x) {
      this.pixels.push([]);
      for (let y = 0; y < size.height; ++y) {
        this.pixels[x].push(
          ((x + y) * this.resolution) / (size.width + size.height)
        );
        // this.pixels[x].push(0);
      }
    }
  };

  calculate = () => {
    const step = 16;
    const size = this.renderSize;
    console.log('Calculating', size.width, size.height);
    for (let x = 0; x < size.width / step; x += step) {
      for (let y = 0; y < size.height / step; y += step) {
        const r = (x / size.width - 0.5) * 4;
        const i = (y / size.height - 0.5) * 4;
        const iterations = this.fractal.calculate(r, i, this.resolution);
        for (let dx = 0; dx < step; ++dx) {
          for (let dy = 0; dy < step; ++dy) {
            this.pixels[x + dx][y + dy] = iterations;
          }
        }
      }
    }
    this.render();
  };
}
