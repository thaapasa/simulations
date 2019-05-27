import * as PIXI from 'pixi.js';
import { Size } from '../../game/common/Size';
import { ModelRenderer } from '../common/ModelRenderer';
import { PixiRendererSupport } from '../common/PixiRendererSupport';
import { TileRenderer } from '../common/TileRenderer';
import { GameOfLifeModel } from './GameOfLifeModel';

export class GameOfLifeRenderer implements ModelRenderer<PIXI.Application> {
  private tileRenderer: TileRenderer;
  private support: PixiRendererSupport;

  constructor(
    model: GameOfLifeModel,
    attachRef: React.RefObject<HTMLDivElement>
  ) {
    this.tileRenderer = new TileRenderer(model);
    this.support = new PixiRendererSupport(model, this, attachRef);
  }

  destroy = () => this.support.destroy();

  updateSize = (newSize: Size) => this.support.updateSize(newSize);

  render = () => {
    this.tileRenderer.createMissingTiles(this.support.app);
    this.tileRenderer.render();
  };

  createSprites(app: PIXI.Application) {
    this.tileRenderer.createSprites(app);
  }
}
