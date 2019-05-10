import { computed, observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Ant } from '../../game/langton/Ant';
import { InfiniteGrid } from '../../game/langton/InfiniteGrid';
import { timeout } from '../../util/Util';

export class LangtonModel {
  @observable
  visibleGrid: boolean[][] = [];
  @observable
  ant = new Ant();
  @observable
  range = { from: { x: -14, y: -7 }, to: { x: 15, y: 7 } };

  private grid = new InfiniteGrid(false);

  private stepping = false;

  @computed
  get gridOffset(): Position {
    return this.range.from;
  }

  animateStep = async () => {
    this.updateGrid();
    await timeout(180);
  };

  updateGrid = () => {
    this.visibleGrid = this.grid.render(this.range.from, this.range.to);
  };

  step = async () => {
    if (this.stepping) {
      return;
    }
    this.stepping = true;
    await this.ant.stepAnimated(this.grid, this.animateStep);
    await this.animateStep();
    this.stepping = false;
  };
}
