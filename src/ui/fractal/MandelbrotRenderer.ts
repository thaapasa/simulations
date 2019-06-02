import * as PIXI from 'pixi.js';
import { Size } from '../../game/common/Size';
import { ModelRenderer } from '../common/ModelRenderer';
import { PixiRendererSupport } from '../common/PixiRendererSupport';
import { MandelbrotModel } from './MandelbrotModel';

export class MandelbrotRenderer implements ModelRenderer<PIXI.Application> {
  zeroValue = 0;

  private model: MandelbrotModel;
  private context: CanvasRenderingContext2D | undefined;
  private canvas: HTMLCanvasElement | undefined;
  private buffer: ImageData | undefined;
  private support: PixiRendererSupport;

  constructor(
    model: MandelbrotModel,
    attachRef: React.RefObject<HTMLDivElement>
  ) {
    this.model = model;
    this.support = new PixiRendererSupport(this.model, this, attachRef);
  }

  destroy = () => {
    if (this.buffer) {
      this.buffer = undefined;
    }
  };

  updateSize = (newSize: Size) => {
    this.support.updateSize(newSize);
  };

  render = () => {
    // console.time('Render');
    if (!this.context) {
      return;
    }
    const { width, height } = this.model.renderSize;

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
        buffer.data[pixelindex] = color.r;
        buffer.data[pixelindex + 1] = 255 - color.g;
        buffer.data[pixelindex + 2] = color.b;
        buffer.data[pixelindex + 3] = 255;
      }
    }
    ctx.putImageData(buffer, 0, 0);
    //     console.timeEnd('Render');
  };

  createSprites = (app: PIXI.Application, size: Size) => {
    this.canvas = document.createElement('canvas');
    this.canvas.width = size.width;
    this.canvas.height = size.height;
    this.context = this.canvas.getContext('2d')!;

    const texture = PIXI.Texture.fromCanvas(this.canvas);
    console.log('Texture size', texture.width, texture.height);
    const sprite = new PIXI.Sprite(texture);
    app.stage.addChild(sprite);

    this.model.renderer.resetPixels();
    this.buffer = undefined;
    setImmediate(this.model.calculate);
  };
}
