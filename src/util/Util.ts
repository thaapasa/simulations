export function noop() {
  // No-op
}

export async function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function nextTick() {
  return new Promise(resolve => setImmediate(resolve));
}

export function allNumbers(from: number, to: number): number[] {
  const arr: number[] = [];
  for (let x = from; x <= to; x++) {
    arr.push(x);
  }
  return arr;
}

export function bound(val: number, min: number, max: number): number {
  return val < min ? min : val > max ? max : val;
}
