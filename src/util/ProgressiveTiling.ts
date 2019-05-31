import { Range, rangeIsValid } from '../game/common/Range';

export function* generateTiling(size: number): IterableIterator<Range> {
  if (size < 1) {
    return;
  }
  const wholeArea = { from: { x: 0, y: 0 }, to: { x: size - 1, y: size - 1 } };
  yield wholeArea;
  const stack: Range[] = [wholeArea];

  while (stack.length > 0) {
    const { to, from } = stack.shift()!;
    // console.log('This', to, from);

    // Invariant: { to, from } is already yielded, so just yield sub-areas + split
    const mid = {
      x: Math.floor((to.x - from.x) / 2) + from.x,
      y: Math.floor((to.y - from.y) / 2) + from.y,
    };
    const leftMiddle = {
      from: { x: mid.x, y: from.y },
      to,
    };
    const topLeft = {
      from,
      to: { x: mid.x, y: mid.y },
    };
    const topRight = {
      from: { x: mid.x + 1, y: from.y },
      to: { x: to.x, y: mid.y },
    };
    const bottomLeft = {
      from: { x: from.x, y: mid.y + 1 },
      to: { x: mid.x, y: to.y },
    };
    const bottomRight = {
      from: { x: mid.x + 1, y: mid.y + 1 },
      to,
    };

    console.log('Corners', topLeft, topRight, bottomLeft, bottomRight);

    // Whole second half (x-axis), only for yielding
    if (rangeIsValid(leftMiddle) && mid.x > from.x) {
      yield leftMiddle;
    }

    // Bottom parts (to yield + split)
    if (mid.y > from.y) {
      if (rangeIsValid(bottomLeft) && mid.x < to.x) {
        // console.log('Bottom left', bottomLeft);
        stack.push(bottomLeft);
        yield bottomLeft;
      }
      if (rangeIsValid(bottomRight) && mid.x > from.x) {
        // console.log('Bottom right', bottomRight);
        stack.push(bottomRight);
        yield bottomRight;
      }
    }

    // Top parts (to split)
    if (mid.y < to.y) {
      // Top left
      if (rangeIsValid(topLeft) && mid.x > from.x) {
        // console.log('Top left', topLeft);
        stack.push(topLeft);
      }
      // Top right
      if (rangeIsValid(topRight) && mid.x < to.x) {
        // console.log('Top right', topRight);
        stack.push(topRight);
      }
    }
  }

  return;
}
