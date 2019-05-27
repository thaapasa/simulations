import { Size, sizeEquals } from '../../game/common/Size';
import { ModelRenderer } from '../common/ModelRenderer';
import { MandelbrotModel } from './MandelbrotModel';

export class MandelbrotRenderer implements ModelRenderer<void> {
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
      this.buffer = undefined;
      this.render();
    }
  };

  render = () => {
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

    for (let x = 0; x < size.width; ++x) {
      for (let y = 0; y < size.height; ++y) {
        const pixelindex = (y * size.width + x) * 4;
        buffer.data[pixelindex] = Math.round(x / 20);
        buffer.data[pixelindex + 1] = Math.round(y / 6);
        buffer.data[pixelindex + 2] = Math.round(x / 27);
        buffer.data[pixelindex + 3] = 255;
      }
    }
    ctx.putImageData(buffer, 0, 0);
  };

  createSprites = (_: void) => {
    // Fliib
  };
}
