import { Position } from './Position';

export interface Range {
  from: Position;
  to: Position;
}

export function rangeHasSize(range: Range) {
  return range.to.x > range.from.x && range.to.y > range.from.y;
}

export function rangeIsValid(range: Range) {
  return range.to.x >= range.from.x && range.to.y >= range.from.y;
}
