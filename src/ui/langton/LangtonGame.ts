import { action, computed, observable, runInAction } from 'mobx';
import { Position } from '../../game/common/Position';
import { Ant } from '../../game/langton/Ant';
import { InfiniteGrid } from '../../game/langton/InfiniteGrid';
import { timeout } from '../../util/Util';

type GameMode = 'pause' | 'step' | 'play' | 'fast';

export class LangtonModel {
  @observable
  visibleGrid: boolean[][] = [];
  @observable
  ant = new Ant();
  @observable
  range = { from: { x: -14, y: -7 }, to: { x: 15, y: 7 } };

  @observable
  mode: GameMode = 'pause';

  @observable
  private pauseRequested = false;
  private grid = new InfiniteGrid(false);

  @computed
  get gridOffset(): Position {
    return this.range.from;
  }

  @computed
  get visibleMode(): GameMode {
    if (this.pauseRequested) {
      return 'pause';
    }
    return this.mode;
  }

  animateStep = async () => {
    this.updateGrid();
    await timeout(180);
  };

  updateGrid = () => {
    this.visibleGrid = this.grid.render(this.range.from, this.range.to);
  };

  step = async () => {
    if (this.mode !== 'pause') {
      return;
    }
    this.mode = 'step';
    await this.doStep();
    runInAction(this.setPause);
  };

  play = async () => {
    if (this.mode !== 'pause') {
      return;
    }
    this.mode = 'play';
    while (!this.pauseRequested) {
      await this.doStep();
    }
    runInAction(this.setPause);
  };

  pause = () => {
    if (this.mode === 'pause' || this.mode === 'step') {
      return;
    }
    this.pauseRequested = true;
  };

  @action
  private setPause = () => {
    this.mode = 'pause';
    this.pauseRequested = false;
  };

  private doStep = async () => {
    await this.ant.stepAnimated(this.grid, this.animateStep);
    await this.animateStep();
  };
}
