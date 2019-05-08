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
  }
}

export function getDirectionTo(from: Direction, clockWise: boolean): Direction {
  if (clockWise) {
    return (from + 1) % 4;
  } else {
    return (from + 3) % 4;
  }
}
