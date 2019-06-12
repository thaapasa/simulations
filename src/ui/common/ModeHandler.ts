import { action, computed, observable, runInAction } from 'mobx';
import { FpsCalculator } from '../../util/FpsCalculator';
import { nextTick, noop } from '../../util/Util';

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

  private fpsCounter = new FpsCalculator();

  @observable
  private requestedMode: GameMode | undefined;
  private requestCallback?: () => void;

  private game: GameImplementation;

  constructor(game: GameImplementation) {
    this.game = game;
  }

  @computed
  get fps() {
    return this.fpsCounter.fps;
  }

  @computed
  get visibleMode(): GameMode {
    return this.requestedMode || this.mode;
  }

  skip = async (frames: number) => {
    const originalMode = this.mode;
    if (originalMode === 'step') {
      return;
    }
    if (originalMode !== 'pause') {
      await this.pause();
    }
    this.mode = 'skip';
    await nextTick();

    for (let i = 0; i < frames; ++i) {
      this.game.stepNoAnimation();
    }
    this.frame += frames;
    this.game.render();

    if (originalMode !== 'pause') {
      runInAction(() => {
        this.requestMode(originalMode);
        this.setRequestedMode();
      });
    }
  };

  step = async () => {
    if (this.mode !== 'pause') {
      return;
    }
    this.mode = 'step';
    this.requestMode('pause');
    await this.game.stepAnimated();
    this.frame++;
    this.fpsCounter.tick();
    runInAction(this.setRequestedMode);
  };

  play = async () => {
    if (this.mode === 'fast') {
      this.requestMode('play');
      return;
    }
    if (this.mode !== 'pause') {
      return;
    }
    this.mode = 'play';
    this.fpsCounter.reset();
    while (this.mode === 'play' && !this.requestedMode) {
      await this.game.stepAnimated();
      this.frame++;
      this.fpsCounter.tick();
    }
    runInAction(this.setRequestedMode);
  };

  fastForward = async () => {
    if (this.mode === 'play') {
      this.requestMode('fast');
      return;
    }
    if (this.mode !== 'pause') {
      return;
    }
    this.mode = 'fast';
    this.fpsCounter.reset();
    while (this.mode === 'fast' && !this.requestedMode) {
      this.game.stepNoAnimation();
      this.frame++;
      this.fpsCounter.tick();
      this.game.render();
      await nextTick();
    }
    runInAction(this.setRequestedMode);
  };

  @action
  pause = async () => {
    if (this.mode === 'pause' || this.mode === 'step') {
      return;
    }
    return new Promise(resolve => this.requestMode('pause', resolve));
  };

  private requestMode = (mode: GameMode, callback?: () => void) => {
    this.requestedMode = mode;
    this.requestCallback = callback;
  };

  @action
  private setRequestedMode = () => {
    if (!this.requestedMode) {
      return;
    }
    this.mode = 'pause';
    const req = this.requestedMode;
    this.requestedMode = undefined;
    const cb = this.requestCallback || noop;
    switch (req) {
      case 'step':
        setImmediate(() => {
          this.step();
          cb();
        });
        break;
      case 'play':
        setImmediate(() => {
          this.play();
          cb();
        });
        break;
      case 'fast':
        setImmediate(() => {
          this.fastForward();
          cb();
        });
        break;
      default:
        cb();
    }
  };
}
