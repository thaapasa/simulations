import { Size } from '../../game/common/Size';
import { generateTiling } from '../../util/ProgressiveTiling';

export interface PixelSource<T> {
  zeroValue: T;
  getPixelValue: (x: number, y: number, size: Size) => T;
  renderSize: Size;
  repaint: () => void;
}

export class ProgressiveRenderer<T> {
  pixels: T[][] = [];
  private source: PixelSource<T>;
  private calculation: IterableIterator<boolean> | undefined;

  constructor(source: PixelSource<T>) {
    this.source = source;
  }

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
    const size = source.renderSize;
    const step = 8;
    if (size.width < 0 || size.height < 0) {
      return;
    }
    function* calc(): IterableIterator<boolean> {
      const tiles = generateTiling(step);
      while (true) {
        const next = tiles.next();
        if (next.done) {
          return;
        }
        // console.time('Calc');
        const { from, to } = next.value;
        for (let x = 0; x < size.width; x += step) {
          for (let y = 0; y < size.height; y += step) {
            const value = source.getPixelValue(
              x + from.x,
              size.height - (y + from.y),
              size
            );
            for (let dx = from.x; dx < to.x; ++dx) {
              for (let dy = from.y; dy < to.y; ++dy) {
                if (x + dx < size.width && y + dy < size.height) {
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

  private nextCalc = () => {
    if (!this.calculation) {
      return;
    }
    if (this.calculation.next().value) {
      this.source.repaint();
      setImmediate(this.nextCalc);
    } else {
      this.source.repaint();
      this.calculation = undefined;
    }
  };
}
