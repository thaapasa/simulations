import { action, computed, observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { Ant } from '../../game/langton/Ant';
import { InfiniteGrid } from '../../game/langton/InfiniteGrid';
import { timeout } from '../../util/Util';
import { GameMode, ModeHandler } from './ModeHandler';
import { tileSize } from './Tiles';

const halfStepDelay = 180;

export interface Range {
  from: Position;
  to: Position;
}

export class LangtonModel {
  @observable
  drawAreaSize: Size = { width: 1, height: 1 };

  @observable
  offset: Position = { x: -1, y: -11 };

  @observable
  antPosition: Position = { x: 0, y: 0 };
  @observable
  antRotation: number = 0;

  grid = new InfiniteGrid(false);
  control = new ModeHandler(this);

  private ant = new Ant();

  constructor() {
    this.render();
  }

  @computed
  get range(): Range {
    const xtiles = Math.ceil(this.drawAreaSize.width / tileSize) + 1;
    const ytiles = Math.ceil(this.drawAreaSize.height / tileSize) + 1;
    const from = { x: Math.round(-xtiles / 2), y: Math.round(-ytiles / 2) };
    const to = { x: from.x + xtiles, y: from.y + ytiles };
    return { from, to };
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
    return this.range.from;
  }

  @computed
  get animate(): boolean {
    return this.control.mode !== 'fast' && this.control.mode !== 'skip';
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
  };

  animateStep = async () => {
    this.render();
    await timeout(halfStepDelay);
  };
}
