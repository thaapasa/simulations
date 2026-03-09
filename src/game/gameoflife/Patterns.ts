import { Position } from '../common/Position';

export interface BrushPattern {
  name: string;
  cells: Position[];
  /** Can drag-paint continuously with this brush */
  paintable?: boolean;
}

export const PATTERNS: BrushPattern[] = [
  {
    name: 'Solu',
    cells: [{ x: 0, y: 0 }],
    paintable: true,
  },
  {
    name: 'Neliö',
    cells: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    paintable: true,
  },
  {
    name: 'Risti',
    cells: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ],
    paintable: true,
  },
  {
    name: 'Liitäjä',
    cells: [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ],
  },
  {
    name: 'Gosper Gun',
    cells: gosperGliderGun(),
  },
];

/** Rotate pattern 90° clockwise, repeated `times` times */
export function rotatePattern(cells: Position[], times: number): Position[] {
  const n = ((times % 4) + 4) % 4;
  let result = cells;
  for (let i = 0; i < n; i++) {
    result = result.map(({ x, y }) => ({ x: y, y: -x }));
  }
  return result;
}

/** Get pattern cells with rotation applied */
export function getBrushCells(
  pattern: BrushPattern,
  rotation: number
): Position[] {
  return rotatePattern(pattern.cells, rotation);
}

/**
 * Gosper Glider Gun pattern, centered approximately at origin.
 *
 * Standard layout (36 wide × 9 tall), offset so the pattern
 * is roughly centered.
 */
function gosperGliderGun(): Position[] {
  // Raw coords with (0,0) at top-left of bounding box
  const raw: Position[] = [
    // Left block
    { x: 0, y: 4 },
    { x: 0, y: 5 },
    { x: 1, y: 4 },
    { x: 1, y: 5 },
    // Left part of gun
    { x: 10, y: 4 },
    { x: 10, y: 5 },
    { x: 10, y: 6 },
    { x: 11, y: 3 },
    { x: 11, y: 7 },
    { x: 12, y: 2 },
    { x: 12, y: 8 },
    { x: 13, y: 2 },
    { x: 13, y: 8 },
    { x: 14, y: 5 },
    { x: 15, y: 3 },
    { x: 15, y: 7 },
    { x: 16, y: 4 },
    { x: 16, y: 5 },
    { x: 16, y: 6 },
    { x: 17, y: 5 },
    // Right part of gun
    { x: 20, y: 2 },
    { x: 20, y: 3 },
    { x: 20, y: 4 },
    { x: 21, y: 2 },
    { x: 21, y: 3 },
    { x: 21, y: 4 },
    { x: 22, y: 1 },
    { x: 22, y: 5 },
    { x: 24, y: 0 },
    { x: 24, y: 1 },
    { x: 24, y: 5 },
    { x: 24, y: 6 },
    // Right block
    { x: 34, y: 2 },
    { x: 34, y: 3 },
    { x: 35, y: 2 },
    { x: 35, y: 3 },
  ];

  // Center the pattern and flip Y (grid Y increases upward)
  const cx = 17;
  const cy = 4;
  return raw.map(({ x, y }) => ({ x: x - cx, y: cy - y }));
}
