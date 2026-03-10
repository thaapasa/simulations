import { Size, sizeEquals } from '../../game/common/Size';
import { toQueryString } from '../../util/QueryString';
import { ModelRenderer } from '../common/ModelRenderer';
import { FractalModel } from './FractalModel';

type NavigateFn = (path: string, options?: { replace?: boolean }) => void;

export class FractalRenderer implements ModelRenderer<void> {
  zeroValue = 0;

  private model: FractalModel;
  private canvasRef: React.RefObject<HTMLCanvasElement | null>;
  private buffer: ImageData | undefined;
  private context: CanvasRenderingContext2D | undefined;
  private navigate: NavigateFn;

  constructor(
    model: FractalModel,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    navigate: NavigateFn
  ) {
    this.model = model;
    this.canvasRef = canvasRef;
    this.navigate = navigate;
    model.onParamsChange = this.updateUrl;
  }

  updateUrl = () => {
    this.navigate(
      this.model.pathPrefix +
        '?' +
        toQueryString({
          r: this.model.modelCenter.x,
          i: this.model.modelCenter.y,
          scale: this.model.scale.value,
          resolution: this.model.resolution.value,
        }),
      { replace: true }
    );
  };

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
      setTimeout(this.model.calculate, 0);
    }
  };

  render = () => {
    if (!this.canvasRef.current) {
      return;
    }
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

    const drag = this.model.dragPoint;
    const isDragging = drag.x !== 0 || drag.y !== 0;

    // Skip expensive pixel-to-buffer copy during drag;
    // just reposition the existing buffer
    if (!isDragging) {
      const data = this.buffer.data;
      const pixels = this.model.renderer.pixels;
      const colors = this.model.colorProvider;
      const w = width;

      // Row-major order for cache-friendly sequential access
      for (let y = 0; y < height; ++y) {
        let pixelindex = y * w * 4;
        let pi = y * w;
        for (let x = 0; x < w; ++x) {
          const color = colors.getColorAt(pixels[pi]);
          if (color) {
            data[pixelindex] = color.r;
            data[pixelindex + 1] = color.g;
            data[pixelindex + 2] = color.b;
            data[pixelindex + 3] = 255;
          }
          pixelindex += 4;
          pi++;
        }
      }
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    ctx.putImageData(this.buffer, -drag.x, drag.y);
  };

  createSprites = (_: void) => {
    // Noop
  };
}
