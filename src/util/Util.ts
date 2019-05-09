export function noop() {
  // No-op
}

export async function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
