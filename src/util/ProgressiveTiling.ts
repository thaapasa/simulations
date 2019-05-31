import { Range, rangeHasSize } from '../game/common/Range';

interface WorkItem {
  range: Range;
  action: 'yield' | 'split';
}

export function* generateTiling(size: number): IterableIterator<Range> {
  if (size < 1) {
    return;
  }
  const wholeArea = { from: { x: 0, y: 0 }, to: { x: size, y: size } };
  const stack: WorkItem[] = [{ range: wholeArea, action: 'yield' }];

  while (stack.length > 0) {
    const { range, action } = stack.shift()!;
    if (action === 'yield') {
      yield range;
      stack.push({ range, action: 'split' });
      continue;
    }
    const { to, from } = range;
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
      from: { x: mid.x, y: from.y },
      to: { x: to.x, y: mid.y },
    };
    const bottomLeft = {
      from: { x: from.x, y: mid.y },
      to: { x: mid.x, y: to.y },
    };
    const bottomRight = {
      from: { x: mid.x, y: mid.y },
      to,
    };

    // Whole second half (x-axis), only for yielding
    if (rangeHasSize(leftMiddle) && mid.x > from.x) {
      yield leftMiddle;
    }

    // Bottom parts (to yield + split)
    if (mid.y > from.y) {
      if (rangeHasSize(bottomLeft) && mid.x < to.x) {
        stack.push({ range: bottomLeft, action: 'yield' });
      }
      if (rangeHasSize(bottomRight) && mid.x > from.x) {
        stack.push({ range: bottomRight, action: 'yield' });
      }
    }

    // Top parts (to split)
    if (mid.y < to.y) {
      // Top left
      if (rangeHasSize(topLeft) && mid.x > from.x) {
        stack.push({ range: topLeft, action: 'split' });
      }
      // Top right
      if (rangeHasSize(topRight) && mid.x < to.x) {
        stack.push({ range: topRight, action: 'split' });
      }
    }
  }

  return;
}
