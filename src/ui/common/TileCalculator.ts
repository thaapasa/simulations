import { computed, observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Model, Range } from './Model';

export class TileCalculator {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  @computed
  get tileSize() {
    return 32 * this.model.scale;
  }

  @observable
  get tileCount(): number {
    const size = this.model.renderSize;
    const tileSize = this.tileSize;
    return (
      Math.ceil(size.height / tileSize + 2) *
      Math.ceil(size.width / tileSize + 2)
    );
  }

  @computed
  get renderArea(): Range {
    const center = this.model.centerPoint;
    const size = this.model.renderSize;
    const from = {
      x: Math.round(center.x - size.width / 2),
      y: Math.round(center.y - size.height / 2),
    };
    const to = {
      x: from.x + size.width,
      y: from.y + size.height,
    };
    return { from, to };
  }

  @computed
  get tileRange(): Range {
    const area = this.renderArea;
    const size = this.tileSize;
    return {
      from: {
        x: stepAwayZero(area.from.x, size),
        y: stepAwayZero(area.from.y, size),
      },
      to: {
        x: stepAwayZero(area.to.x, size),
        y: stepAwayZero(area.to.y, size),
      },
    };
  }

  @computed
  get gridOffset(): Position {
    const area = this.renderArea;
    const size = this.tileSize;
    return {
      x: modAwayZero(area.from.x, size),
      y: modAwayZero(area.from.y, size),
    };
  }
}

function modAwayZero(num: number, base: number) {
  if (num >= 0) {
    const mod = num % base;
    if (mod === 0) {
      return 0;
    }
    return base - mod;
  } else {
    const mod = -num % base;
    if (mod === 0) {
      return 0;
    }
    return -(base - mod);
  }
}

function stepAwayZero(num: number, base: number) {
  if (num >= 0) {
    return Math.ceil(num / base);
  } else {
    return -Math.ceil(-num / base);
  }
}
