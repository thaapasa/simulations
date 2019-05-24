import { action, computed, observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { Ant } from '../../game/langton/Ant';
import { InfiniteGrid } from '../../game/langton/InfiniteGrid';
import { noop, timeout } from '../../util/Util';
import { GameMode, ModeHandler } from '../common/ModeHandler';
import { Model } from '../common/Model';
import { TileCalculator } from '../common/TileCalculator';

const halfStepDelay = 180;

export class LangtonModel implements Model {
  readonly minScale = 0.3;
  readonly maxScale = 1.5;

  @observable
  renderSize: Size = { width: 1, height: 1 };

  @observable
  scale: number = 1;

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
