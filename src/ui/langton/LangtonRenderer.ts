import { toJS } from 'mobx';
import * as PIXI from 'pixi.js';
import { Size, sizeEquals } from '../../game/common/Size';
import ant from '../../icons/ant.svg';
import blackTile from '../../icons/black-tile.svg';
import whiteTile from '../../icons/white-tile.svg';
import { HexColors } from '../Colors';
import { ModelRenderer } from '../common/Model';
import { removeChildNodes } from '../DomUtils';
import { LangtonModel } from './LangtonModel';

export class LangtonRenderer implements ModelRenderer {
  app: PIXI.Application;
  private model: LangtonModel;

  private whiteTiles: PIXI.Sprite[] = [];
  private blackTiles: PIXI.Sprite[] = [];
  private ant = PIXI.Sprite.from(ant);
  private domAttachPoint: React.RefObject<HTMLDivElement>;

  constructor(model: LangtonModel, attachRef: React.RefObject<HTMLDivElement>) {
    this.model = model;
    this.ant.anchor.set(0.5);
    this.app = this.createApp();
    this.domAttachPoint = attachRef;
  }

  destroy() {
    if (this.domAttachPoint.current) {
      removeChildNodes(this.domAttachPoint.current);
    }
    if (this.app) {
      this.app.destroy();
    }
  }

  updateSize = (newSize: Size) => {
    if (!sizeEquals(newSize, this.model.renderSize)) {
      this.model.renderSize = newSize;
      this.app = this.createApp();
      const cur = this.domAttachPoint.current;
      if (cur) {
        removeChildNodes(cur);
        cur.appendChild(this.app.view);
        this.render();
      }
    }
  };

  render = () => {
    this.createMissingTiles(this.app);
    const scale = this.model.scale;
    let whiteIdx = 0;
    let blackIdx = 0;
    const tileRange = this.model.tileRange;
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

  private showAtPosition(
    sprite: PIXI.Sprite,
    x: number,
    y: number,
    scale: number,
    rotation?: number
  ) {
    sprite.visible = true;
    sprite.x =
      (x - this.model.tileRange.from.x) * this.model.tileSize +
      this.model.gridOffset.x;
    sprite.y =
      this.model.renderSize.height -
      ((y - this.model.tileRange.from.y) * this.model.tileSize +
        this.model.gridOffset.y);
    sprite.scale.x = scale;
    sprite.scale.y = scale;
    if (rotation !== undefined) {
      sprite.rotation = rotation;
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
    this.createSprites(app);
    return app;
  }

  get tileCount(): number {
    const size = this.model.renderSize;
    const tileSize = this.model.tileSize;
    return (
      Math.ceil(size.height / tileSize + 2) *
      Math.ceil(size.width / tileSize + 2)
    );
  }

  private createSprites(app: PIXI.Application) {
    app.stage.removeChildren();
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

  private createMissingTiles(app: PIXI.Application) {
    const required = this.tileCount;
    const tileSize = this.model.tileSize;
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
