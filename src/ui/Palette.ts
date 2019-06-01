import { ByteColor, ByteColors } from './Colors';

export interface ColorStop {
  position: number;
  color: ByteColor;
}

export type Palette = ColorStop[];

export const defaultPalette: Palette = [
  { position: 0, color: ByteColors.black },
  { position: 0.07, color: ByteColors.darkBlue },
  { position: 0.1, color: ByteColors.darkRed },
  { position: 0.6, color: ByteColors.lightRed },
  { position: 1, color: ByteColors.white },
];

export function getColorAt(position: number, palette: Palette): ByteColor {
  if (palette.length < 1) {
    return ByteColors.black;
  }
  if (position <= palette[0].position) {
    return palette[0].color;
  }
  if (position >= palette[palette.length - 1].position) {
    return palette[palette.length - 1].color;
  }
  for (let n = 0; n < palette.length - 1; ++n) {
    if (position === palette[n].position) {
      return palette[n].color;
    }
    const min = palette[n];
    const max = palette[n + 1];
    if (position > min.position && position < max.position) {
      const ratio = (position - min.position) / (max.position - min.position);
      return {
        r: Math.round(min.color.r + (max.color.r - min.color.r) * ratio),
        g: Math.round(min.color.g + (max.color.g - min.color.g) * ratio),
        b: Math.round(min.color.b + (max.color.b - min.color.b) * ratio),
      };
    }
  }
  return ByteColors.black;
}
