import { action, computed, observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { Ant } from '../../game/langton/Ant';
import { InfiniteGrid } from '../../game/langton/InfiniteGrid';
import { noop, timeout } from '../../util/Util';
import { GameMode, ModeHandler } from '../common/ModeHandler';
import { Model, Range } from '../common/Model';

const halfStepDelay = 180;

export class LangtonModel implements Model {
  readonly minScale = 0.3;
  readonly maxScale = 1.5;

  @observable
  scale: number = 1;

  @observable
  renderSize: Size = { width: 1, height: 1 };

  @observable
  centerPoint: Position = { x: 0, y: 0 };

  grid = new InfiniteGrid(false);
  ant = new Ant();
  control = new ModeHandler(this);

  renderCallback: () => void = noop;

  constructor() {
    this.render();
  }

  @computed
  get fps() {
    return this.control.fps;
  }

  @computed
  get tileSize() {
    return 32 * this.scale;
  }

  @computed
  get renderArea(): Range {
    const center = this.centerPoint;
    const size = this.renderSize;
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
  get mode(): GameMode {
    return this.control.visibleMode;
  }

  @computed
  get frame(): number {
    return this.control.frame;
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

  @computed
  get animate(): boolean {
    // return this.control.mode !== 'fast' && this.control.mode !== 'skip';
    return false;
  }

  stepNoAnimation = () => {
    this.ant.step(this.grid);
  };

  stepAnimated = async () => {
    await this.ant.stepAnimated(this.grid, this.animateStep);
    this.render();
    await timeout(halfStepDelay);
  };

  @action
  render = () => {
    this.renderCallback();
  };

  animateStep = async () => {
    this.render();
    await timeout(halfStepDelay);
  };
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
