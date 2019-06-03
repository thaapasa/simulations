import * as PIXI from 'pixi.js';
import { Size } from '../../game/common/Size';
import { ModelRenderer } from '../common/ModelRenderer';
import { PixiRendererSupport } from '../common/PixiRendererSupport';
import { MandelbrotModel } from './MandelbrotModel';

export class MandelbrotRenderer implements ModelRenderer<PIXI.Application> {
  zeroValue = 0;

  private model: MandelbrotModel;
  private support: PixiRendererSupport;

  constructor(
    model: MandelbrotModel,
    attachRef: React.RefObject<HTMLDivElement>
  ) {
    this.model = model;
    this.support = new PixiRendererSupport(this.model, this, attachRef);
  }

  destroy = () => {
    // Noop
  };

  updateSize = (newSize: Size) => {
    this.support.updateSize(newSize);
  };

  render = () => {
    // console.time('Render');
    const { width, height } = this.model.renderSize;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    const buffer = ctx.createImageData(width, height);

    const pixels = this.model.renderer.pixels;
    const colors = this.model.colorProvider;

    for (let x = 0; x < width; ++x) {
      for (let y = 0; y < height; ++y) {
        const pixelindex = (y * width + x) * 4;
        const pos = pixels[x][y];
        const color = colors.getColorAt(pos);
        buffer.data[pixelindex] = color.r;
        buffer.data[pixelindex + 1] = color.g;
        buffer.data[pixelindex + 2] = color.b;
        buffer.data[pixelindex + 3] = 255;
      }
    }
    ctx.putImageData(buffer, 0, 0);

    const texture = PIXI.Texture.fromCanvas(canvas);
    const sprite = new PIXI.Sprite(texture);
    this.support.app.stage.removeChildren();
    this.support.app.stage.addChild(sprite);

    //     console.timeEnd('Render');
  };

  createSprites = (_: PIXI.Application, size: Size) => {
    this.model.renderer.resetPixels();
    setImmediate(this.model.calculate);
  };
}
