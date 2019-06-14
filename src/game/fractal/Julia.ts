import { Fractal } from './Fractal';

const limit = 4;
export class Julia implements Fractal {
  readonly r: number;
  readonly i: number;
  constructor(r: number, i: number) {
    this.r = r;
    this.i = i;
  }
  calculate(r: number, i: number, maxIterations: number): number {
    let cr = r;
    let ci = i;
    let crcr = cr * cr;
    let cici = ci * ci;
    for (let n = 0; n < maxIterations; ++n) {
      const cr2 = crcr - cici;
      const ci2 = 2 * cr * ci + this.i;
      cr = cr2 + this.r;
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
