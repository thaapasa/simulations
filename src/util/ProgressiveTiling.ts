import { Range } from '../ui/common/Model';

export function* generateTiling(size: number): IterableIterator<Range> {
  if (size < 1) {
    return;
  }
  const wholeArea = { from: { x: 0, y: 0 }, to: { x: size - 1, y: size - 1 } };
  yield { ...wholeArea };
  const stack: Range[] = [wholeArea];

  while (stack.length > 0) {
    const val = stack.shift()!;
    // console.log('This', val);

    // Invariant: val is already yielded, so just yield sub-areas + split
    const mid = {
      x: Math.round((val.to.x - val.from.x) / 2) + val.from.x,
      y: Math.round((val.to.y - val.from.y) / 2) + val.from.y,
    };
    // Whole second half (x-axis), only for yielding
    if (mid.x < val.to.x) {
      yield {
        from: { x: mid.x, y: val.from.y },
        to: val.to,
      };
    }

    // Bottom parts (to yield + split)
    if (mid.y < val.to.y) {
      // Bottom left
      if (mid.x > val.from.x) {
        const bottomLeft = {
          from: { x: val.from.x, y: mid.y },
          to: { x: mid.x, y: val.to.y },
        };
        console.log('Bottom left', bottomLeft);
        stack.push(bottomLeft);
        yield bottomLeft;
      }
      // Bottom right
      if (mid.x < val.to.x) {
        const bottomRight = {
          from: mid,
          to: val.to,
        };
        console.log('Bottom right', bottomRight);
        stack.push(bottomRight);
        yield bottomRight;
      }
    }

    // Top parts (to split)
    if (mid.y > val.from.y) {
      // Top left
      if (mid.x > val.from.x) {
        const topLeft = {
          from: val.from,
          to: mid,
        };
        console.log('Top left', topLeft);
        // stack.push(topLeft);
      }
      // Top right
      if (mid.x < val.to.x) {
        const topRight = {
          from: { x: mid.x, y: val.from.y },
          to: { x: val.to.x, y: mid.y },
        };
        console.log('Top right', topRight);
        stack.push(topRight);
      }
    }
  }

  return;
}
