import 'jest';
import { hexByte, rgbColor } from './Colors';

describe('Color utils', () => {
  it('calculates hex bytes from unit values', () => {
    expect(hexByte(0)).toBe('00');
    expect(hexByte(1)).toBe('FF');
    expect(hexByte(0.5)).toBe('80');
    expect(hexByte(0.498)).toBe('7F');
    expect(hexByte(0.02)).toBe('05');
  });
  it('calculates hex bytes', () => {
    expect(hexByte(0, false)).toBe('00');
    expect(hexByte(1, false)).toBe('01');
    expect(hexByte(255, false)).toBe('FF');
    expect(hexByte(127, false)).toBe('7F');
  });
  it('calculates rgb color strings', () => {
    expect(rgbColor(7, 125, 250, false)).toBe('#077DFA');
    expect(rgbColor(0, 0, 0, false)).toBe('#000000');
    expect(rgbColor(255, 255, 255, false)).toBe('#FFFFFF');
  });
  it('calculates rgb color strings from unit values', () => {
    expect(rgbColor(0, 0, 0, true)).toBe('#000000');
    expect(rgbColor(1, 1, 1, true)).toBe('#FFFFFF');
    expect(rgbColor(0.5, 0.498, 0.02, true)).toBe('#807F05');
  });
});
