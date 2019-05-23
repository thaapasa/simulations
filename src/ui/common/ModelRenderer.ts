import { toJS } from 'mobx';
import * as PIXI from 'pixi.js';
import { Size, sizeEquals } from '../../game/common/Size';
import { HexColors } from '../Colors';
import { removeChildNodes } from '../DomUtils';
import { Model } from './Model';

export interface ModelRenderer {
  updateSize: (size: Size) => void;
  createSprites: (app: PIXI.Application) => void;
  render(): void;
}

export class RendererSupport {
  app: PIXI.Application;

  private model: Model;
  private modelRenderer: ModelRenderer;
  private domAttachPoint: React.RefObject<HTMLDivElement>;

  constructor(
    model: Model,
    modelRenderer: ModelRenderer,
    attachRef: React.RefObject<HTMLDivElement>
  ) {
    this.model = model;
    this.modelRenderer = modelRenderer;
    this.domAttachPoint = attachRef;
    this.app = this.createApp();
  }

  updateSize = (newSize: Size) => {
    if (!sizeEquals(newSize, this.model.renderSize)) {
      this.model.renderSize = newSize;
      this.app = this.createApp();
      const cur = this.domAttachPoint.current;
      if (cur) {
        removeChildNodes(cur);
        cur.appendChild(this.app.view);
        this.modelRenderer.render();
      }
    }
  };

  destroy() {
    if (this.domAttachPoint.current) {
      removeChildNodes(this.domAttachPoint.current);
    }
    if (this.app) {
      this.app.destroy();
    }
  }

  private createApp() {
    if (this.app) {
      this.app.destroy();
    }

    const size = this.model.renderSize;
    const resolution = 1;
    console.log('Creating PIXI app of size', toJS(size));
    const app = new PIXI.Application({
      width: size.width,
      height: size.height,
      backgroundColor: HexColors.darkBlue,
      resolution,
    });
    this.modelRenderer.createSprites(app);
    return app;
  }
}
