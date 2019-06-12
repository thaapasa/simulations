import { action, computed, observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { GameOfLife } from '../../game/gameoflife/GameOfLife';
import { BoundValue } from '../../util/BoundValue';
import { noop, timeout } from '../../util/Util';
import { GameMode, ModeHandler } from '../common/ModeHandler';
import { Model } from '../common/Model';
import { TileCalculator } from '../common/TileCalculator';

const baseStepDelay = 100;

export class GameOfLifeModel implements Model {
  @observable
  scale = new BoundValue(1, 0.3, 1.5, 0.05);

  @observable
  speed = new BoundValue(1, 0.5, 5, 0.1);

  @observable
  dragPoint: Position = { x: 0, y: 0 };

  @observable
  renderSize: Size = { width: 1, height: 1 };

  set centerPoint(pos: Position) {
    this.tileCalc.centerInPx = pos;
  }

  @computed
  get centerPoint(): Position {
    return this.tileCalc.centerInPx;
  }

  @computed
  get stepDelay(): number {
    return baseStepDelay / this.speed.value;
  }

  grid = new GameOfLife(false);
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

  repaint = () => this.render();

  stepNoAnimation = () => {
    this.grid.step();
  };

  stepAnimated = async () => {
    this.grid.step();
    this.render();
    await timeout(this.stepDelay);
  };

  @action
  render = () => {
    this.renderCallback();
  };

  animateStep = async () => {
    this.render();
    await timeout(this.stepDelay);
  };
}
