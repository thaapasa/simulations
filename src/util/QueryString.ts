export function parseQueryString<T = string>(
  search: string,
  mapper?: (s: string) => T
): Record<string, T> {
  const res: Record<string, T> = {};
  if (search) {
    search
      .replace(/^[?]/, '')
      .split('&')
      .forEach(s => {
        const [k, v] = s.split('=', 2);
        res[decodeURIComponent(k)] = mapper
          ? mapper(decodeURIComponent(v))
          : ((decodeURIComponent(v) as unknown) as T);
      });
  }
  return res;
}

export function toQueryString(params: Record<string, any>): string {
  return Object.keys(params)
    .map(
      k => `${encodeURIComponent(k)}=${encodeURIComponent(String(params[k]))}`
    )
    .join('&');
}
