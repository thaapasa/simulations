import { Position } from './Position';

export enum Direction {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

export function getPositionTo(from: Position, direction: Direction): Position {
  switch (direction) {
    case Direction.NORTH:
      return { x: from.x, y: from.y + 1 };
    case Direction.EAST:
      return { x: from.x + 1, y: from.y };
    case Direction.SOUTH:
      return { x: from.x, y: from.y - 1 };
    case Direction.WEST:
      return { x: from.x - 1, y: from.y };
    default:
      return from;
  }
}

export function getDirectionTo(from: Direction, clockWise: boolean): Direction {
  if (clockWise) {
    return (from + 1) % 4;
  } else {
    return (from + 3) % 4;
  }
}

export const DirectionRotation: Record<Direction, number> = {
  [Direction.NORTH]: 0,
  [Direction.EAST]: 90,
  [Direction.SOUTH]: 180,
  [Direction.WEST]: -90,
};

// Taken from https://stackoverflow.com/questions/19618745/css3-rotate-transition-doesnt-take-shortest-way
export function closestEquivalentAngle(from: number, to: number) {
  const delta = ((((to - from) % 360) + 540) % 360) - 180;
  return from + delta;
}
