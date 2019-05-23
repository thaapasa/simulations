import { action, computed, observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { GameOfLife } from '../../game/gameoflife/GameOfLife';
import { noop, timeout } from '../../util/Util';
import { GameMode, ModeHandler } from '../common/ModeHandler';
import { Model } from '../common/Model';
import { TileCalculator } from '../common/TileCalculator';

const stepDelay = 90;

export class GameOfLifeModel implements Model {
  readonly minScale = 0.3;
  readonly maxScale = 1.5;

  @observable
  scale: number = 1;

  @observable
  renderSize: Size = { width: 1, height: 1 };

  @observable
  centerPoint: Position = { x: 0, y: 0 };

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

  stepNoAnimation = () => {
    this.grid.step();
  };

  stepAnimated = async () => {
    this.grid.step();
    this.render();
    await timeout(stepDelay);
  };

  @action
  render = () => {
    this.renderCallback();
  };

  animateStep = async () => {
    this.render();
    await timeout(stepDelay);
  };
}
