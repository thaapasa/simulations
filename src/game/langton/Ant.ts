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
  position: Position = { x: 0, y: 0 };
  direction: Direction = Direction.NORTH;
  rotation: number = DirectionRotation[Direction.NORTH];

  step(grid: InfiniteGrid) {
    this.position = getPositionTo(this.position, this.direction);
    this.direction = getDirectionTo(
      this.direction,
      grid.flip(this.position.x, this.position.y)
    );
  }

  async stepAnimated(grid: InfiniteGrid, update: () => Promise<void>) {
    this.position = getPositionTo(this.position, this.direction);
    await update();
    this.direction = getDirectionTo(
      this.direction,
      grid.flip(this.position.x, this.position.y)
    );
    this.rotation = closestEquivalentAngle(
      this.rotation,
      DirectionRotation[this.direction]
    );
  }
}
