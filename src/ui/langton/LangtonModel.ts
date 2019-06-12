import { action, computed, observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { Ant } from '../../game/langton/Ant';
import { InfiniteGrid } from '../../game/langton/InfiniteGrid';
import { BoundValue } from '../../util/BoundValue';
import { noop, timeout } from '../../util/Util';
import { GameMode, ModeHandler } from '../common/ModeHandler';
import { Model } from '../common/Model';
import { TileCalculator } from '../common/TileCalculator';

const halfStepDelayBase = 180;

export class LangtonModel implements Model {
  @observable
  renderSize: Size = { width: 1, height: 1 };

  @observable
  scale = new BoundValue(1, 0.3, 1.5, 0.05);

  @observable
  speed = new BoundValue(1, 0.1, 5, 0.1);

  @observable
  dragPoint: Position = { x: 0, y: 0 };

  @computed
  get halfStepDelay(): number {
    return halfStepDelayBase / this.speed.value;
  }

  set centerPoint(pos: Position) {
    this.tileCalc.centerInPx = pos;
  }

  @computed
  get centerPoint(): Position {
    return this.tileCalc.centerInPx;
  }

  grid = new InfiniteGrid(false);
  ant = new Ant();
  control = new ModeHandler(this);
  tileCalc = new TileCalculator(this);

  renderCallback: () => void = noop;

  constructor() {
    this.render();
  }

  repaint = () => this.render();

  @computed
  get mode(): GameMode {
    return this.control.visibleMode;
  }

  stepNoAnimation = () => {
    this.ant.step(this.grid);
  };

  stepAnimated = async () => {
    await this.ant.stepAnimated(this.grid, this.animateStep);
    this.render();
    await timeout(this.halfStepDelay);
  };

  @action
  render = () => {
    this.renderCallback();
  };

  animateStep = async () => {
    this.render();
    await timeout(this.halfStepDelay);
  };
}
