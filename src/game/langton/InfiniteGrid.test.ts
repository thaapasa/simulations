import 'jest';
import { Ant } from './Ant';
import { InfiniteGrid } from './InfiniteGrid';

describe('Langton-InfiniteGrid', () => {
  it('calculates grid', () => {
    // Warm-up
    console.log('Warming up...');
    for (let i = 0; i < 5; ++i) {
      runSimulation();
    }
    console.log('Starting test');
    const times = [new Date().getTime()];
    for (let i = 0; i < 5; ++i) {
      runSimulation();
      times.push(new Date().getTime());
    }
    const elapsed = [];
    for (let t = 0; t < times.length; ++t) {
      if (t > 0) {
        elapsed.push(times[t] - times[t - 1]);
      }
    }
    console.log(
      'Average time:',
      elapsed.reduce((p, c) => p + c) / elapsed.length
    );
  });
});

function runSimulation() {
  const grid = new InfiniteGrid();
  const ant = new Ant();
  for (let i = 0; i < 30000; ++i) {
    ant.step(grid);
  }
}
