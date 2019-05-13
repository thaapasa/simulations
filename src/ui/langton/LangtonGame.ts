import { action, computed, observable, runInAction } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { Ant } from '../../game/langton/Ant';
import { InfiniteGrid } from '../../game/langton/InfiniteGrid';
import { nextTick, timeout } from '../../util/Util';

type GameMode = 'pause' | 'step' | 'play' | 'fast' | 'skip';

export class LangtonModel {
  @observable
  range = { from: { x: -14, y: -7 }, to: { x: 15, y: 7 } };
  @observable
  drawAreaSize: Size = { width: 1, height: 1 };

  @observable
  frame = 0;

  @observable
  antPosition: Position = { x: 0, y: 0 };
  @observable
  antRotation: number = 0;
  grid = new InfiniteGrid(false);

  @observable
  private requestedMode: GameMode | undefined;

  @observable
  private mode: GameMode = 'pause';
  private ant = new Ant();

  constructor() {
    this.publish();
  }

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
    return this.mode !== 'fast' && this.mode !== 'skip';
  }

  animateStep = async () => {
    this.publish();
    await timeout(180);
  };

  skip = async (frames: number) => {
    if (this.mode !== 'pause') {
      return;
    }
    this.mode = 'skip';
    this.requestedMode = 'pause';
    await nextTick();

    for (let i = 0; i < frames; ++i) {
      this.ant.step(this.grid);
    }
    this.frame += frames;
    this.publish();

    runInAction(this.setRequestedMode);
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
      default:
    }
  };

  @action
  private publish = () => {
    this.antPosition = this.ant.position;
    this.antRotation = this.ant.rotation;
  };

  private doStepAnimated = async () => {
    await this.ant.stepAnimated(this.grid, this.animateStep);
    await this.animateStep();
    this.frame++;
  };

  private doStepNoAnimation = () => {
    this.ant.step(this.grid);
    this.publish();
    this.frame++;
  };
}
