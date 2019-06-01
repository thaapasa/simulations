// tslint:disable no-bitwise

export function rgbColor(
  r: number,
  g: number,
  b: number,
  unit: boolean = true
) {
  return `#${hexByte(r, unit)}${hexByte(g, unit)}${hexByte(b, unit)}`;
}

const HexValues = '0123456789ABCDEF';

export function hexByte(num: number, unit: boolean = true): string {
  const val = Math.round(unit ? num * 255 : num);
  return HexValues[(val >> 4) & 0xf] + HexValues[val & 0xf];
}
