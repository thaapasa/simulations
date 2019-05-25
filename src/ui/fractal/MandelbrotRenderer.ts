import * as PIXI from 'pixi.js';
import { Size } from '../../game/common/Size';
import { ModelRenderer, RendererSupport } from '../common/ModelRenderer';
import { MandelbrotModel } from './MandelbrotModel';

export class MandelbrotRenderer implements ModelRenderer {
  private model: MandelbrotModel;
  private support: RendererSupport;

  constructor(
    model: MandelbrotModel,
    attachRef: React.RefObject<HTMLDivElement>
  ) {
    this.model = model;
    this.support = new RendererSupport(model, this, attachRef);
  }

  destroy = () => {
    this.support.destroy();
  };

  updateSize = (newSize: Size) => this.support.updateSize(newSize);

  render = () => {
    // Floob
  };

  createSprites = (app: PIXI.Application) => {
    // Fliib
  };
}
