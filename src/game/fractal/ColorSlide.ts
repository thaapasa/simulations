export class ColorSlide {
  calculate(r: number, i: number, resolution: number): number {
    return (r + 4 + i * 1.5) * resolution * 0.2;
  }
}
