import 'jest';
import { generateTiling } from './ProgressiveTiling';

describe('ProgressiveTiling', () => {
  it('should generate tiling', () => {
    const tiling = generateTiling(4);
    let n = 100;
    while (n-- > 1) {
      const next = tiling.next();
      if (next.done) {
        console.log('Done');
        break;
      } else {
        console.log('Value:', next.value);
      }
    }
  });
});
