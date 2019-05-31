import 'jest';
import { generateTiling } from './ProgressiveTiling';

describe('ProgressiveTiling', () => {
  it('should generate correct tiling', () => {
    testTiling(2);
    testTiling(4);
    testTiling(8);
    testTiling(16);
  });
});

function testTiling(size: number) {
  const tiling = generateTiling(size);
  const corners: Record<string, string> = {};
  let tiles = 0;
  while (true) {
    const next = tiling.next();
    if (next.done) {
      break;
    } else {
      const val = next.value;
      corners[`${val.from.x},${val.from.y}`] = `${val.to.x},${val.to.y}`;
      tiles++;
    }
  }
  expect(tiles).toBe(size * size);
  for (let x = 0; x < size; ++x) {
    for (let y = 0; y < size; ++y) {
      expect(corners[`${x},${y}`]).toBeTruthy();
    }
  }
}
