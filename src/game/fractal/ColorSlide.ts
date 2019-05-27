export class Mandelbrot {
  calculate(r: number, i: number, _: number): number {
    return Math.abs(r + i * 1.37) / 30;
  }
}
