export interface Size {
  width: number;
  height: number;
}

export function sizeEquals(s1: Size, s2: Size) {
  return s1.height === s2.height && s1.width === s2.width;
}
