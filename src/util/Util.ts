export function noop() {
  // No-op
}

export async function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function nextTick() {
  return new Promise(resolve => setImmediate(resolve));
}
