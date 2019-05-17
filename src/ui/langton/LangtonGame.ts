import { action, computed, observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { Ant } from '../../game/langton/Ant';
import { InfiniteGrid } from '../../game/langton/InfiniteGrid';
import { noop, timeout } from '../../util/Util';
import { GameMode, ModeHandler } from './ModeHandler';

const halfStepDelay = 180;

export interface Range {
  from: Position;
  to: Position;
}

export class LangtonModel {
  @observable
  tileSize: number = 32;

  @observable
  renderSize: Size = { width: 1, height: 1 };

  @observable
  centerPoint: Position = { x: 0, y: 0 };

  @observable
  antPosition: Position = { x: 0, y: 0 };

  @observable
  antRotation: number = 0;

  grid = new InfiniteGrid(false);
  control = new ModeHandler(this);

  renderCallback: () => void = noop;

  private ant = new Ant();

  constructor() {
    this.render();
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
        x: Math.floor(area.from.x / size),
        y: Math.floor(area.from.y / size),
      },
      to: {
        x: Math.ceil(area.to.x / size),
        y: Math.ceil(area.to.y / size),
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
    return { x: area.from.x % size, y: area.from.y % size };
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
    this.antPosition = this.ant.position;
    this.antRotation = this.ant.rotation;
    this.renderCallback();
  };

  animateStep = async () => {
    this.render();
    await timeout(halfStepDelay);
  };
}
