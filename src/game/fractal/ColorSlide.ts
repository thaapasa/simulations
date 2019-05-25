export class Mandelbrot {
  calculate(r: number, i: number, _: number): number {
    return (r + i * 1.37) / 30;
  }
}
