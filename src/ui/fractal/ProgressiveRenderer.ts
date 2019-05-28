import { Size } from '../../game/common/Size';

export interface PixelSource<T> {
  zeroValue: T;
  getPixelValue: (x: number, y: number, size: Size) => T;
  renderSize: Size;
  render: () => void;
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
    const source = this.source;
    const pixels = this.pixels;
    const size = source.renderSize;
    const step = 16;
    if (size.width < 0 || size.height < 0) {
      return;
    }
    function* calc(): IterableIterator<boolean> {
      for (let x = 0; x < size.width; x += step) {
        for (let y = 0; y < size.height; y += step) {
          const value = source.getPixelValue(x, y, size);
          for (let dx = 0; dx < step; ++dx) {
            for (let dy = 0; dy < step; ++dy) {
              if (x + dx < size.width && y + dy < size.height) {
                pixels[x + dx][y + dy] = value;
              }
            }
          }
        }
      }
      yield true;
      return false;
    }
    this.calculation = calc();
    setImmediate(this.nextCalc);
  };

  private nextCalc = () => {
    if (!this.calculation) {
      return;
    }
    if (this.calculation.next().value) {
      this.source.render();
      setImmediate(this.nextCalc);
    } else {
      this.source.render();
      this.calculation = undefined;
    }
  };
}
