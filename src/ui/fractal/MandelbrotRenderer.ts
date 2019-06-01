import { Size, sizeEquals } from '../../game/common/Size';
import { ModelRenderer } from '../common/ModelRenderer';
import { defaultPalette, getColorAt } from '../Palette';
import { MandelbrotModel } from './MandelbrotModel';

export class MandelbrotRenderer implements ModelRenderer<void> {
  zeroValue = 0;

  private model: MandelbrotModel;
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private buffer: ImageData | undefined;

  constructor(
    model: MandelbrotModel,
    canvasRef: React.RefObject<HTMLCanvasElement>
  ) {
    this.model = model;
    this.canvasRef = canvasRef;
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
    console.time('Render');
    if (!this.canvasRef.current) {
      return;
    }
    const size = this.model.renderSize;
    const ctx = this.canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    }
    if (!this.buffer) {
      this.buffer = ctx.createImageData(size.width, size.height);
    }
    const buffer = this.buffer;

    const pixels = this.model.renderer.pixels;
    const resolution = this.model.resolution;

    for (let x = 0; x < size.width; ++x) {
      for (let y = 0; y < size.height; ++y) {
        const pixelindex = (y * size.width + x) * 4;
        const pos = pixels[x][y] / resolution;
        const color = getColorAt(pos, defaultPalette);
        buffer.data[pixelindex] = color.r;
        buffer.data[pixelindex + 1] = color.g;
        buffer.data[pixelindex + 2] = color.b;
        buffer.data[pixelindex + 3] = 255;
      }
    }
    ctx.putImageData(buffer, 0, 0);
    console.timeEnd('Render');
  };

  createSprites = (_: void) => {
    // Noop
  };
}
