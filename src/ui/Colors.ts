export const Colors = {
  blue: '#64B5F6',
  lightBlue: '#9BE7FF',
  darkBlue: '#2286C3',
  reallyDarkBlue: '#293C47',
  red: '#E91E63',
  lightRed: '#FF6090',
  darkRed: '#B0003A',
  black: '#333333',
  white: '#F7F7F7',
};

export const HexColors = {
  darkBlue: 0x2286c3,
};

// Values from 0 to 255
export interface ByteColor {
  r: number;
  g: number;
  b: number;
}

export function rgbByte(r: number, g: number, b: number): ByteColor {
  return { r, g, b };
}

export const ByteColors = {
  black: rgbByte(0, 0, 0),
  white: rgbByte(255, 255, 255),
  red: rgbByte(233, 30, 90),
  lightRed: rgbByte(255, 96, 144),
  darkRed: rgbByte(176, 0, 58),
  blue: rgbByte(100, 181, 246),
  lightBlue: rgbByte(155, 231, 255),
  darkBlue: rgbByte(34, 134, 195),
};
