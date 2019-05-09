import { Position } from '../common/Position';

export class InfiniteGrid {
  readonly defaultValue: boolean;
  private grid: Record<number, Record<number, boolean>> = {};
  constructor(defaultValue: boolean = false) {
    this.defaultValue = defaultValue;
  }

  get(x: number, y: number): boolean {
    const column = this.grid[x];
    if (!column) {
      return this.defaultValue;
    }
    const val = column[y];
    return val !== undefined ? val : this.defaultValue;
  }

  flip(x: number, y: number): boolean {
    let column = this.grid[x];
    if (!column) {
      column = {};
      this.grid[x] = column;
    }
    if (column[y] === undefined) {
      column[y] = this.defaultValue;
    }
    column[y] = !column[y];
    return column[y];
  }

  render(from: Position, to: Position): boolean[][] {
    const result: boolean[][] = [];
    for (let x = from.x; x <= to.x; ++x) {
      const col: boolean[] = [];
      for (let y = from.y; y <= to.y; ++y) {
        col.push(this.get(x, y));
      }
      result.push(col);
    }
    return result;
  }
}
