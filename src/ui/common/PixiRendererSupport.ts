import { toJS } from 'mobx';
import { Application } from 'pixi.js';
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
  private initCounter = 0;

  constructor(
    model: Model,
    modelRenderer: ModelRenderer<Application>,
    attachRef: React.RefObject<HTMLDivElement | null>
  ) {
    this.model = model;
    this.modelRenderer = modelRenderer;
    this.domAttachPoint = attachRef;
  }

  updateSize = (newSize: Size) => {
    if (!this.app || !sizeEquals(newSize, this.model.renderSize)) {
      this.model.renderSize = newSize;
      this.initApp();
    }
  };

  destroy = () => {
    this.initCounter++;
    if (this.domAttachPoint.current) {
      removeChildNodes(this.domAttachPoint.current);
    }
    if (this.app) {
      this.app.destroy();
      this.app = undefined;
    }
  };

  private initApp = async () => {
    const thisInit = ++this.initCounter;

    if (this.app) {
      this.app.destroy();
      this.app = undefined;
    }

    const size = this.model.renderSize;
    console.log('Creating PIXI app of size', toJS(size));
    const app = new Application();
    await app.init({
      width: size.width,
      height: size.height,
      backgroundColor: HexColors.darkBlue,
      resolution: 1,
    });

    // Another initApp was called while we were awaiting; discard this one
    if (thisInit !== this.initCounter) {
      app.destroy();
      return;
    }

    this.app = app;
    await this.modelRenderer.createSprites(app);
    const cur = this.domAttachPoint.current;
    if (cur) {
      removeChildNodes(cur);
      cur.appendChild(app.canvas);
      this.modelRenderer.render();
    }
  };
}
