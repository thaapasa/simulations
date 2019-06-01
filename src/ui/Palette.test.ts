import 'jest';
import { ByteColors, rgbByte } from './Colors';
import { getColorAt, Palette } from './Palette';

export const palette: Palette = [
  { position: 0, color: rgbByte(0, 0, 0) },
  { position: 0.3, color: rgbByte(176, 0, 58) },
  { position: 1, color: rgbByte(34, 134, 195) },
];

describe('Palette', () => {
  it('calculates color palette', () => {
    expect(getColorAt(0, palette)).toStrictEqual(rgbByte(0, 0, 0));
    expect(getColorAt(0.01, palette)).toStrictEqual(rgbByte(6, 0, 2));
    expect(getColorAt(0.1, palette)).toStrictEqual(rgbByte(59, 0, 19));
    expect(getColorAt(0.29, palette)).toStrictEqual(rgbByte(170, 0, 56));
    expect(getColorAt(0.3, palette)).toStrictEqual(rgbByte(176, 0, 58));
    expect(getColorAt(0.31, palette)).toStrictEqual(rgbByte(174, 2, 60));
    expect(getColorAt(0.5, palette)).toStrictEqual(rgbByte(135, 38, 97));
    expect(getColorAt(0.9, palette)).toStrictEqual(rgbByte(54, 115, 175));
    expect(getColorAt(0.99, palette)).toStrictEqual(rgbByte(36, 132, 193));
    expect(getColorAt(1, palette)).toStrictEqual(rgbByte(34, 134, 195));
  });
});
