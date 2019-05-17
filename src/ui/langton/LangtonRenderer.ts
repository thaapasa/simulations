import { toJS } from 'mobx';
import * as PIXI from 'pixi.js';
import { Size, sizeEquals } from '../../game/common/Size';
import ant from '../../icons/ant.svg';
import blackTile from '../../icons/black-tile.svg';
import whiteTile from '../../icons/white-tile.svg';
import { HexColors } from '../Colors';
import { LangtonModel } from './LangtonGame';
import { tileSize } from './Tiles';

export class LangtonRenderer {
  app: PIXI.Application;
  private model: LangtonModel;

  private whiteTiles: PIXI.Sprite[] = [];
  private blackTiles: PIXI.Sprite[] = [];
  private ant = PIXI.Sprite.from(ant);

  constructor(model: LangtonModel) {
    this.model = model;
    this.app = this.createApp();
  }

  updateSize = (newSize: Size) => {
    if (!sizeEquals(newSize, this.model.renderSize)) {
      this.model.renderSize = newSize;
      this.app = this.createApp();
    }
  };

  render = () => {
    let whiteIdx = 0;
    let blackIdx = 0;
    const tileRange = this.model.tileRange;
    for (let x = tileRange.from.x; x <= tileRange.to.x; ++x) {
      for (let y = tileRange.from.y; y <= tileRange.to.y; ++y) {
        const white = this.model.grid.get(x, y);
        const sprite = white
          ? this.whiteTiles[whiteIdx++]
          : this.blackTiles[blackIdx++];
        this.showAtPosition(sprite, x, y);
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
      this.model.antPosition.x,
      this.model.antPosition.y
    );
  };

  showAtPosition(sprite: PIXI.Sprite, x: number, y: number) {
    sprite.visible = true;
    sprite.x =
      (x - this.model.tileRange.from.x) * this.model.tileSize +
      this.model.gridOffset.x;
    sprite.y =
      (y - this.model.tileRange.from.y) * this.model.tileSize +
      this.model.gridOffset.y;
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
    this.createSprites(app);
    return app;
  }

  private createSprites(app: PIXI.Application) {
    const size = this.model.renderSize;
    const tiles =
      Math.ceil(size.height / tileSize + 2) *
      Math.ceil(size.width / tileSize + 2);
    for (const im of this.whiteTiles) {
      im.destroy();
    }
    for (const im of this.blackTiles) {
      im.destroy();
    }
    this.whiteTiles = [];
    this.blackTiles = [];
    for (let i = 0; i < tiles; ++i) {
      const whiteSprite = PIXI.Sprite.from(whiteTile);
      whiteSprite.visible = false;
      whiteSprite.x = -tileSize - 10;
      this.whiteTiles.push(whiteSprite);
      app.stage.addChild(whiteSprite);

      const blackSprite = PIXI.Sprite.from(blackTile);
      blackSprite.visible = false;
      blackSprite.x = -tileSize - 10;
      this.blackTiles.push(blackSprite);
      app.stage.addChild(blackSprite);
    }
    app.stage.addChild(this.ant);
  }
}
