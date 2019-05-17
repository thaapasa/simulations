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
        sprite.x = x * this.model.tileSize;
        sprite.y = y * this.model.tileSize;
      }
    }
    for (; whiteIdx < this.whiteTiles.length; ++whiteIdx) {
      this.whiteTiles[whiteIdx].x = -tileSize;
    }
    for (; blackIdx < this.blackTiles.length; ++blackIdx) {
      this.blackTiles[blackIdx].x = -tileSize;
    }
  };

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
    this.createSprites();
    return app;
  }

  private createSprites() {
    const size = this.model.renderSize;
    const tiles = (size.height / tileSize + 2) * (size.width / tileSize + 2);
    for (let i = 0; i < tiles; ++i) {
      const whiteSprite = PIXI.Sprite.from(whiteTile);
      whiteSprite.x = -tileSize;
      this.whiteTiles.push(whiteSprite);

      const blackSprite = PIXI.Sprite.from(blackTile);
      blackSprite.x = -tileSize;
      this.blackTiles.push(blackSprite);
    }
  }
}
