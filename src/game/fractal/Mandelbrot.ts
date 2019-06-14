import { Fractal } from './Fractal';

const limit = 4;
export class Mandelbrot implements Fractal {
  calculate(r: number, i: number, maxIterations: number): number {
    let cr = r;
    let ci = i;
    let crcr = cr * cr;
    let cici = ci * ci;
    for (let n = 0; n < maxIterations; ++n) {
      const cr2 = crcr - cici + r;
      const ci2 = 2 * cr * ci + i;
      cr = cr2;
      ci = ci2;
      crcr = cr * cr;
      cici = ci * ci;
      if (crcr + cici > limit) {
        return n;
      }
    }
    return 0;
  }
}
