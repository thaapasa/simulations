import { action, computed, observable, runInAction } from 'mobx';
import { Position } from '../../game/common/Position';
import { Ant } from '../../game/langton/Ant';
import { InfiniteGrid } from '../../game/langton/InfiniteGrid';
import { nextTick, timeout } from '../../util/Util';

type GameMode = 'pause' | 'step' | 'play' | 'fast';

export class LangtonModel {
  @observable
  visibleGrid: boolean[][] = [];
  @observable
  ant = new Ant();
  @observable
  range = { from: { x: -14, y: -7 }, to: { x: 15, y: 7 } };

  @observable
  frame = 0;

  @observable
  private requestedMode: GameMode | undefined;

  @observable
  private mode: GameMode = 'pause';
  private grid = new InfiniteGrid(false);

  @computed
  get gridOffset(): Position {
    return this.range.from;
  }

  @computed
  get visibleMode(): GameMode {
    return this.requestedMode || this.mode;
  }

  @computed
  get animate(): boolean {
    return this.mode !== 'fast';
  }

  animateStep = async () => {
    this.updateGrid();
    await timeout(180);
  };

  @action
  updateGrid = () => {
    this.visibleGrid = this.grid.render(this.range.from, this.range.to);
  };

  step = async () => {
    if (this.mode !== 'pause') {
      return;
    }
    this.mode = 'step';
    this.requestedMode = 'pause';
    await this.doStepAnimated();
    runInAction(this.setRequestedMode);
  };

  play = async () => {
    if (this.mode === 'fast') {
      this.requestedMode = 'play';
      return;
    }
    if (this.mode !== 'pause') {
      return;
    }
    this.mode = 'play';
    while (this.mode === 'play' && !this.requestedMode) {
      await this.doStepAnimated();
    }
    runInAction(this.setRequestedMode);
  };

  fastForward = async () => {
    if (this.mode === 'play') {
      this.requestedMode = 'fast';
      return;
    }
    if (this.mode !== 'pause') {
      return;
    }
    this.mode = 'fast';
    while (this.mode === 'fast' && !this.requestedMode) {
      this.doStepNoAnimation();
      await nextTick();
    }
    runInAction(this.setRequestedMode);
  };

  @action
  pause = () => {
    if (this.mode === 'pause' || this.mode === 'step') {
      return;
    }
    this.requestedMode = 'pause';
  };

  @action
  private setRequestedMode = () => {
    if (!this.requestedMode) {
      return;
    }
    this.mode = 'pause';
    const req = this.requestedMode;
    this.requestedMode = undefined;
    switch (req) {
      case 'step':
        setImmediate(this.step);
        this.step();
        break;
      case 'play':
        setImmediate(this.play);
        break;
      case 'fast':
        setImmediate(this.fastForward);
        break;
    }
  };

  private doStepAnimated = async () => {
    await this.ant.stepAnimated(this.grid, this.animateStep);
    await this.animateStep();
    this.frame++;
  };

  private doStepNoAnimation = () => {
    this.ant.step(this.grid);
    this.updateGrid();
    this.frame++;
  };
}
