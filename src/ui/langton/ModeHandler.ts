import { action, computed, observable, runInAction } from 'mobx';
import { nextTick } from '../../util/Util';

export type GameMode = 'pause' | 'step' | 'play' | 'fast' | 'skip';

export interface GameImplementation {
  stepNoAnimation(): void;
  stepAnimated(): Promise<void>;
  render(): void;
}

export class ModeHandler {
  @observable
  frame = 0;

  @observable
  mode: GameMode = 'pause';

  @observable
  private requestedMode: GameMode | undefined;

  private game: GameImplementation;

  constructor(game: GameImplementation) {
    this.game = game;
  }

  @computed
  get visibleMode(): GameMode {
    return this.requestedMode || this.mode;
  }

  skip = async (frames: number) => {
    if (this.mode !== 'pause') {
      return;
    }
    this.mode = 'skip';
    this.requestedMode = 'pause';
    await nextTick();

    for (let i = 0; i < frames; ++i) {
      this.game.stepNoAnimation();
    }
    this.frame += frames;
    this.game.render();

    runInAction(this.setRequestedMode);
  };

  step = async () => {
    if (this.mode !== 'pause') {
      return;
    }
    this.mode = 'step';
    this.requestedMode = 'pause';
    await this.game.stepAnimated();
    this.frame++;
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
      await this.game.stepAnimated();
      this.frame++;
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
      this.game.stepNoAnimation();
      this.frame++;
      this.game.render();
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
}
