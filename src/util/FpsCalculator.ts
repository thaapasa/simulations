import { action, computed, observable } from 'mobx';

const FpsUpdateFrequencyMs = 200;

class Averager {
  @observable
  value: number = 0;

  private initialized: boolean = false;

  @action
  newValue = (newVal: number) => {
    if (!this.initialized) {
      this.value = newVal;
      this.initialized = true;
    }
    this.value = 0.5 * this.value + 0.5 * newVal;
  };

  @action
  reset = () => {
    this.value = 0;
    this.initialized = false;
  };
}

export class FpsCalculator {
  @computed
  get fps(): number {
    return this.fpsAverager.value;
  }

  private lastMeasurementTime: number = new Date().getTime();
  private lastFrames = 0;
  private currentFrames = 0;
  private fpsAverager = new Averager();

  @action
  tick = (frames: number = 1) => {
    this.currentFrames += frames;
    const time = new Date().getTime();
    const elapsedTime = time - this.lastMeasurementTime;
    if (elapsedTime >= FpsUpdateFrequencyMs) {
      const elapsedFrames = this.currentFrames - this.lastFrames;
      const fps = (elapsedFrames * 1000) / elapsedTime;
      this.fpsAverager.newValue(fps);
      this.lastMeasurementTime = time;
      this.lastFrames = this.currentFrames;
    }
  };

  @action
  reset = () => {
    this.lastMeasurementTime = new Date().getTime();
    this.lastFrames = 0;
    this.currentFrames = 0;
    this.fpsAverager.reset();
  };
}
