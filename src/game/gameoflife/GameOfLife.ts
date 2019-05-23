type Grid = Record<string, boolean>;

export class GameOfLife {
  readonly defaultValue: boolean;
  private grid: Grid = {};

  constructor(defaultValue: boolean = false) {
    this.defaultValue = defaultValue;
  }

  get(x: number, y: number): boolean {
    const key = `${x},${y}`;
    const val = this.grid[key];
    if (val === undefined || val === null) {
      return this.defaultValue;
    }
    return val;
  }

  randomize(num: number) {
    for (let i = 0; i < num; ++i) {
      const scale = Math.log10(i + 2) * 13;
      const x = Math.ceil(Math.random() * scale - scale / 2);
      const y = Math.ceil(Math.random() * scale - scale / 2);
      this.grid[`${x},${y}`] = true;
    }
  }

  addMover() {
    this.grid['0,0'] = true;
    this.grid['1,0'] = true;
    this.grid['2,0'] = true;
    this.grid['2,1'] = true;
    this.grid['1,2'] = true;
  }

  step() {
    const newGrid: Grid = {};
    for (const key in this.grid) {
      if (this.grid.hasOwnProperty(key)) {
        const [xs, ys] = key.split(',');
        const x = Number(xs);
        const y = Number(ys);
        for (let dx = -1; dx <= 1; ++dx) {
          for (let dy = -1; dy <= 1; ++dy) {
            this.calcValueTo(x + dx, y + dy, newGrid);
          }
        }
      }
    }
    Object.keys(newGrid).forEach(k => {
      if (newGrid[k] === false) {
        delete newGrid[k];
      }
    });
    this.grid = newGrid;
  }

  private calcValueTo(x: number, y: number, newGrid: Grid) {
    const key = `${x},${y}`;
    if (newGrid[key] !== undefined) {
      return;
    }
    let liveCells = 0;
    for (let dx = -1; dx <= 1; ++dx) {
      for (let dy = -1; dy <= 1; ++dy) {
        if (!(dx === 0 && dy === 0) && this.get(x + dx, y + dy)) {
          liveCells += 1;
        }
      }
    }
    newGrid[key] = this.grid[key]
      ? liveCells === 2 || liveCells === 3
      : liveCells === 3;
  }
}
