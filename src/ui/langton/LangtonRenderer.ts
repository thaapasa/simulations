import * as PIXI from 'pixi.js';
import { Size } from '../../game/common/Size';
import ant from '../../icons/ant.svg';
import { ModelRenderer, RendererSupport } from '../common/ModelRenderer';
import { TileRenderer } from '../common/TileRenderer';
import { LangtonModel } from './LangtonModel';

export class LangtonRenderer implements ModelRenderer {
  private model: LangtonModel;
  private tileRenderer: TileRenderer;
  private support: RendererSupport;

  private ant = PIXI.Sprite.from(ant);

  constructor(model: LangtonModel, attachRef: React.RefObject<HTMLDivElement>) {
    this.model = model;
    this.ant.anchor.set(0.5);
    this.tileRenderer = new TileRenderer(model);
    this.support = new RendererSupport(model, this, attachRef);
  }

  destroy = () => {
    this.support.destroy();
  };

  updateSize = (newSize: Size) => this.support.updateSize(newSize);

  render = () => {
    if (!this.tileRenderer.hasAllTiles()) {
      this.support.app.stage.removeChild(this.ant);
      this.tileRenderer.createMissingTiles(this.support.app);
      this.support.app.stage.addChild(this.ant);
    }
    this.tileRenderer.render();
    this.tileRenderer.showAtPosition(
      this.ant,
      this.model.ant.position.x,
      this.model.ant.position.y,
      this.model.scale.value,
      (this.model.ant.rotation * Math.PI) / 180
    );
  };

  createSprites = (app: PIXI.Application) => {
    this.tileRenderer.createSprites(app);
    app.stage.addChild(this.ant);
  };
}
