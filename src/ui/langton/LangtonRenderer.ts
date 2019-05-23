import * as PIXI from 'pixi.js';
import { Size } from '../../game/common/Size';
import ant from '../../icons/ant.svg';
import blackTile from '../../icons/black-tile.svg';
import whiteTile from '../../icons/white-tile.svg';
import { ModelRenderer, RendererSupport } from '../common/ModelRenderer';
import { LangtonModel } from './LangtonModel';

export class LangtonRenderer implements ModelRenderer {
  private model: LangtonModel;
  private support: RendererSupport;

  private whiteTiles: PIXI.Sprite[] = [];
  private blackTiles: PIXI.Sprite[] = [];
  private ant = PIXI.Sprite.from(ant);

  constructor(model: LangtonModel, attachRef: React.RefObject<HTMLDivElement>) {
    this.model = model;
    this.ant.anchor.set(0.5);
    this.support = new RendererSupport(model, this, attachRef);
  }

  destroy = () => {
    this.support.destroy();
  };

  updateSize = (newSize: Size) => this.support.updateSize(newSize);

  render = () => {
    this.createMissingTiles(this.support.app);
    const scale = this.model.scale;
    let whiteIdx = 0;
    let blackIdx = 0;
    const tileRange = this.model.tileCalc.tileRange;
    for (let x = tileRange.from.x; x <= tileRange.to.x; ++x) {
      for (let y = tileRange.from.y; y <= tileRange.to.y; ++y) {
        const white = this.model.grid.get(x, y);
        const sprite = white
          ? this.whiteTiles[whiteIdx++]
          : this.blackTiles[blackIdx++];
        this.showAtPosition(sprite, x, y, scale);
      }
    }
    while (whiteIdx < this.whiteTiles.length) {
      this.whiteTiles[whiteIdx++].visible = false;
    }
    while (blackIdx < this.blackTiles.length) {
      this.blackTiles[blackIdx++].visible = false;
    }
    this.showAtPosition(
      this.ant,
      this.model.ant.position.x,
      this.model.ant.position.y,
      scale,
      (this.model.ant.rotation * Math.PI) / 180
    );
  };

  createSprites(app: PIXI.Application) {
    for (const im of this.whiteTiles) {
      im.destroy();
    }
    for (const im of this.blackTiles) {
      im.destroy();
    }
    this.whiteTiles = [];
    this.blackTiles = [];
    app.stage.addChild(this.ant);
    this.createMissingTiles(app);
  }

  private showAtPosition(
    sprite: PIXI.Sprite,
    x: number,
    y: number,
    scale: number,
    rotation?: number
  ) {
    const calc = this.model.tileCalc;
    sprite.visible = true;
    sprite.x = (x - calc.tileRange.from.x) * calc.tileSize + calc.gridOffset.x;
    sprite.y =
      this.model.renderSize.height -
      ((y - calc.tileRange.from.y) * calc.tileSize + calc.gridOffset.y);
    sprite.scale.x = scale;
    sprite.scale.y = scale;
    if (rotation !== undefined) {
      sprite.rotation = rotation;
    }
  }

  private createMissingTiles(app: PIXI.Application) {
    const required = this.model.tileCalc.tileCount;
    const tileSize = this.model.tileCalc.tileSize;
    if (
      this.whiteTiles.length >= required &&
      this.blackTiles.length >= required
    ) {
      return;
    }
    app.stage.removeChild(this.ant);
    for (let i = this.whiteTiles.length; i < required; ++i) {
      const sprite = PIXI.Sprite.from(whiteTile);
      sprite.anchor.set(0.5);
      sprite.visible = false;
      sprite.x = -tileSize - 10;
      this.whiteTiles.push(sprite);
      app.stage.addChild(sprite);
    }
    for (let i = this.blackTiles.length; i < required; ++i) {
      const sprite = PIXI.Sprite.from(blackTile);
      sprite.anchor.set(0.5);
      sprite.visible = false;
      sprite.x = -tileSize - 10;
      this.blackTiles.push(sprite);
      app.stage.addChild(sprite);
    }
    app.stage.addChild(this.ant);
  }
}
