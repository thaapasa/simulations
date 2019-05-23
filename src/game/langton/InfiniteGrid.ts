export class InfiniteGrid {
  readonly defaultValue: boolean;
  private grid: Record<string, boolean> = {};

  constructor(defaultValue: boolean = false) {
    this.defaultValue = defaultValue;
  }

  get(x: number, y: number): boolean {
    const key = `${x},${y}`;
    const val = this.grid[key];
    if (val === undefined) {
      return this.defaultValue;
    }
    return val;
  }

  flip(x: number, y: number): boolean {
    const key = `${x},${y}`;
    const val = this.grid[key];
    if (val === undefined) {
      const newVal = !this.defaultValue;
      this.grid[key] = newVal;
      return newVal;
    }

    const flipped = !val;
    if (flipped === this.defaultValue) {
      delete this.grid[key];
    } else {
      this.grid[key] = flipped;
    }

    return flipped;
  }
}
