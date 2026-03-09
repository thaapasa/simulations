import { toJS } from 'mobx';
import { Application, Sprite } from 'pixi.js';
import { Size, sizeEquals } from '../../game/common/Size';
import { HexColors } from '../Colors';
import { removeChildNodes } from '../DomUtils';
import { Model } from './Model';
import { ModelRenderer } from './ModelRenderer';

export class PixiRendererSupport {
  app: Application | undefined;

  private model: Model;
  private modelRenderer: ModelRenderer<Application>;
  private domAttachPoint: React.RefObject<HTMLDivElement | null>;

  constructor(
    model: Model,
    modelRenderer: ModelRenderer<Application>,
    attachRef: React.RefObject<HTMLDivElement | null>
  ) {
    this.model = model;
    this.modelRenderer = modelRenderer;
    this.domAttachPoint = attachRef;
    this.initApp();
  }

  updateSize = (newSize: Size) => {
    if (!sizeEquals(newSize, this.model.renderSize)) {
      this.model.renderSize = newSize;
      this.initApp();
    }
  };

  destroy = () => {
    if (this.domAttachPoint.current) {
      removeChildNodes(this.domAttachPoint.current);
    }
    if (this.app) {
      this.app.destroy();
      this.app = undefined;
    }
  };

  private initApp = async () => {
    if (this.app) {
      this.app.destroy();
    }

    const size = this.model.renderSize;
    const resolution = 1;
    console.log('Creating PIXI app of size', toJS(size));
    const app = new Application();
    await app.init({
      width: size.width,
      height: size.height,
      backgroundColor: HexColors.darkBlue,
      resolution,
    });
    this.app = app;
    this.modelRenderer.createSprites(app);
    const cur = this.domAttachPoint.current;
    if (cur) {
      removeChildNodes(cur);
      cur.appendChild(app.canvas);
      this.modelRenderer.render();
    }
  };
}
