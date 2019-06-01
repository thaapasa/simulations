const limit = 4;
export class Mandelbrot {
  calculate(r: number, i: number, maxIterations: number): number {
    let cr = r;
    let ci = i;
    for (let n = 0; n < maxIterations; ++n) {
      const cr2 = cr * cr - ci * ci + r;
      const ci2 = cr * ci + cr * ci + i;
      cr = cr2;
      ci = ci2;
      if (cr * cr + ci * ci > limit) {
        return n;
      }
    }
    return 0;
  }
}
