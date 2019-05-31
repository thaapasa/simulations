import 'jest';
import { Position } from '../game/common/Position';
import { generateTiling } from './ProgressiveTiling';

describe('ProgressiveTiling', () => {
  it('should generate correct tiling', () => {
    testTiling(4);
  });
});

function testTiling(size: number) {
  const tiling = generateTiling(4);
  const corners: Record<string, Position> = {};
  let tiles = 0;
  while (true) {
    const next = tiling.next();
    if (next.done) {
      break;
    } else {
      const val = next.value;
      corners[`${val.from.x},${val.from.y}`] = val.to;
      tiles++;
    }
  }
  console.log('Corners', corners);
  expect(tiles).toBe(size * size);
}
