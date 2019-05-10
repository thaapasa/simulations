import { action, observable } from 'mobx';
import {
  closestEquivalentAngle,
  Direction,
  DirectionRotation,
  getDirectionTo,
  getPositionTo,
} from '../common/Direction';
import { Position } from '../common/Position';
import { InfiniteGrid } from './InfiniteGrid';

export class Ant {
  @observable
  position: Position = { x: 0, y: 0 };
  @observable
  direction: Direction = Direction.NORTH;
  @observable
  rotation: number = DirectionRotation[Direction.NORTH];
  private stepping = false;

  @action
  step(grid: InfiniteGrid) {
    if (this.stepping) {
      return;
    }
    this.stepMove();
    this.stepTurn(grid);
  }

  @action
  async stepAnimated(grid: InfiniteGrid, update: () => Promise<void>) {
    if (this.stepping) {
      return;
    }
    this.stepping = true;
    this.stepMove();
    await update();
    this.stepTurn(grid);
    this.stepping = false;
  }

  @action
  private stepMove = () => {
    this.position = getPositionTo(this.position, this.direction);
  };

  @action
  private stepTurn = (grid: InfiniteGrid) => {
    this.direction = getDirectionTo(
      this.direction,
      grid.flip(this.position.x, this.position.y)
    );
    this.rotation = closestEquivalentAngle(
      this.rotation,
      DirectionRotation[this.direction]
    );
  };
}
