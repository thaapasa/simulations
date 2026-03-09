import { Application, Graphics } from 'pixi.js';
import { Size } from '../../game/common/Size';
import { ModelRenderer } from '../common/ModelRenderer';
import { PixiRendererSupport } from '../common/PixiRendererSupport';
import { TileRenderer } from '../common/TileRenderer';
import { GameOfLifeModel } from './GameOfLifeModel';

export class GameOfLifeRenderer implements ModelRenderer<Application> {
  private model: GameOfLifeModel;
  private tileRenderer: TileRenderer;
  private support: PixiRendererSupport;
  private previewGraphics: Graphics | null = null;

  constructor(
    model: GameOfLifeModel,
    attachRef: React.RefObject<HTMLDivElement | null>
  ) {
    this.model = model;
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
    // Ensure preview is always on top of tile sprites (new tiles get added above it)
    if (this.previewGraphics) {
      this.support.app.stage.addChild(this.previewGraphics);
    }
    this.renderPreview();
  };

  async createSprites(app: Application) {
    await this.tileRenderer.createSprites(app);
    this.previewGraphics = new Graphics();
    app.stage.addChild(this.previewGraphics);
  }

  private renderPreview() {
    if (!this.previewGraphics) return;
    this.previewGraphics.clear();

    const { hoverTile, canPaint } = this.model;
    if (!canPaint || !hoverTile) return;

    const cells = this.model.brushCells;
    const calc = this.model.tileCalc;
    const tileSize = calc.tileSize;
    const tileRange = calc.tileRange;
    const gridOffset = calc.gridOffset;
    const renderHeight = this.model.renderSize.height;
    const isSingleCell =
      cells.length === 1 && cells[0].x === 0 && cells[0].y === 0;

    for (const cell of cells) {
      const tx = hoverTile.x + cell.x;
      const ty = hoverTile.y + cell.y;

      const sx =
        (tx - tileRange.from.x) * tileSize + gridOffset.x - tileSize / 2;
      const sy =
        renderHeight -
        ((ty - tileRange.from.y) * tileSize + gridOffset.y) -
        tileSize / 2;

      // For single cell toggle, show red if cell is alive
      const isAlive = this.model.grid.get(tx, ty);
      const color =
        isSingleCell && isAlive ? 0xff4444 : 0x44ff44;

      this.previewGraphics.rect(sx, sy, tileSize, tileSize);
      this.previewGraphics.fill({ color, alpha: 0.4 });
    }
  }
}
