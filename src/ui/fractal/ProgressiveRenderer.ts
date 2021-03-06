import { action, computed, observable, runInAction, toJS } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { BoundValue } from '../../util/BoundValue';
import { FpsCalculator } from '../../util/FpsCalculator';
import { generateTiling } from '../../util/ProgressiveTiling';

export interface PixelSource<T> {
  zeroValue: T;
  getPixelValue: (
    x: number,
    y: number,
    area: Size,
    size: Size,
    offset: Position
  ) => T;
  modelCenter: Position;
  fractalArea: Size;
  renderSize: Size;
  resolution: BoundValue;
  repaint: () => void;
}

export class ProgressiveRenderer<T> {
  pixels: T[][] = [];

  @computed
  get fps(): number {
    return this.fpsCounter.fps;
  }

  @observable
  calculationSteps = 1;
  @observable
  completedSteps = 1;

  private source: PixelSource<T>;
  private calculation: IterableIterator<boolean> | undefined;
  private fpsCounter = new FpsCalculator();

  constructor(source: PixelSource<T>) {
    this.source = source;
  }

  stopRender = () => {
    // console.log('Stop render');
    this.calculation = undefined;
  };

  resetPixels = () => {
    this.pixels = [];
    const size = this.source.renderSize;
    for (let x = 0; x < size.width; ++x) {
      this.pixels.push([]);
      for (let y = 0; y < size.height; ++y) {
        this.pixels[x].push(this.source.zeroValue);
      }
    }
  };

  calculate = () => {
    this.calculation = undefined;
    const source = this.source;
    const pixels = this.pixels;
    const { width, height } = source.renderSize;
    const size = { width, height };
    const area = toJS(source.fractalArea);
    const offset = toJS(source.modelCenter);
    const resolution = source.resolution.value;
    const step = resolution < 70 ? 8 : 16;
    this.calculationSteps = step * step;
    this.completedSteps = 0;
    if (width < 0 || height < 0) {
      return;
    }
    function* calc(): IterableIterator<boolean> {
      const tiles = generateTiling(step);
      while (true) {
        const next = tiles.next();
        if (next.done) {
          return;
        }
        // console.log('Calc');
        // console.time('Calc');
        const { from, to } = next.value;
        for (let x = 0; x < width; x += step) {
          for (let y = 0; y < height; y += step) {
            const value = source.getPixelValue(
              x + from.x,
              height - (y + from.y),
              area,
              size,
              offset
            );
            for (let dx = from.x; dx < to.x; ++dx) {
              for (let dy = from.y; dy < to.y; ++dy) {
                if (x + dx < width && y + dy < height) {
                  pixels[x + dx][y + dy] = value;
                }
              }
            }
          }
        }
        // console.timeEnd('Calc');
        yield true;
      }
    }
    this.calculation = calc();
    setImmediate(this.nextCalc);
  };

  @action
  private nextCalc = () => {
    if (!this.calculation) {
      return;
    }
    this.fpsCounter.tick();
    if (this.calculation.next().value) {
      runInAction(() => {
        this.completedSteps++;
      });
      this.source.repaint();
      setImmediate(this.nextCalc);
    } else {
      this.source.repaint();
      this.calculation = undefined;
    }
  };
}
