import { Application } from 'pixi.js';
import { Size } from '../../game/common/Size';
import { ModelRenderer } from '../common/ModelRenderer';
import { PixiRendererSupport } from '../common/PixiRendererSupport';
import { TileRenderer } from '../common/TileRenderer';
import { GameOfLifeModel } from './GameOfLifeModel';

export class GameOfLifeRenderer implements ModelRenderer<Application> {
  private tileRenderer: TileRenderer;
  private support: PixiRendererSupport;

  constructor(
    model: GameOfLifeModel,
    attachRef: React.RefObject<HTMLDivElement | null>
  ) {
    this.tileRenderer = new TileRenderer(model);
    this.support = new PixiRendererSupport(model, this, attachRef);
  }

  destroy = () => this.support.destroy();

  updateSize = (newSize: Size) => this.support.updateSize(newSize);

  render = () => {
    if (!this.support.app) {
      return;
    }
    this.tileRenderer.createMissingTiles(this.support.app);
    this.tileRenderer.render();
  };

  async createSprites(app: Application) {
    await this.tileRenderer.createSprites(app);
  }
}
