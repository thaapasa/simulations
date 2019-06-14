import { History } from 'history';
import { Size, sizeEquals } from '../../game/common/Size';
import { toQueryString } from '../../util/QueryString';
import { ModelRenderer } from '../common/ModelRenderer';
import { FractalModel } from './FractalModel';

export class FractalRenderer implements ModelRenderer<void> {
  zeroValue = 0;

  private model: FractalModel;
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private buffer: ImageData | undefined;
  private context: CanvasRenderingContext2D | undefined;
  private history: History;

  constructor(
    model: FractalModel,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    history: History
  ) {
    this.model = model;
    this.canvasRef = canvasRef;
    this.history = history;
  }

  destroy = () => {
    if (this.buffer) {
      this.buffer = undefined;
    }
  };

  updateSize = (newSize: Size) => {
    if (!sizeEquals(newSize, this.model.renderSize)) {
      this.model.renderSize = newSize;
      this.model.renderer.resetPixels();
      this.buffer = undefined;
      this.render();
      setImmediate(this.model.calculate);
    }
  };

  render = () => {
    // console.time('Render');
    // console.log('Render');
    if (!this.canvasRef.current) {
      return;
    }
    this.history.replace(
      this.model.pathPrefix +
        '?' +
        toQueryString({
          r: this.model.modelCenter.x,
          i: this.model.modelCenter.y,
          scale: this.model.scale.value,
          resolution: this.model.resolution.value,
        })
    );
    const { width, height } = this.model.renderSize;
    if (!this.context) {
      this.context = this.canvasRef.current.getContext('2d') || undefined;
      if (!this.context) {
        return;
      }
    }
    const ctx = this.context;
    if (!this.buffer) {
      this.buffer = ctx.createImageData(width, height);
    }
    const buffer = this.buffer;

    const pixels = this.model.renderer.pixels;
    const colors = this.model.colorProvider;

    for (let x = 0; x < width; ++x) {
      for (let y = 0; y < height; ++y) {
        const pixelindex = (y * width + x) * 4;
        const pos = pixels[x][y];
        const color = colors.getColorAt(pos);
        if (color) {
          buffer.data[pixelindex] = color.r;
          buffer.data[pixelindex + 1] = color.g;
          buffer.data[pixelindex + 2] = color.b;
          buffer.data[pixelindex + 3] = 255;
        }
      }
    }
    const drag = this.model.dragPoint;
    ctx.putImageData(buffer, -drag.x, drag.y);
    // console.timeEnd('Render');
  };

  createSprites = (_: void) => {
    // Noop
  };
}
