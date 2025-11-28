export function formatTime(milliseconds: number): string {
  if (milliseconds < 1) {
    return `${(milliseconds * 1000).toFixed(2)} μs`;
  } else if (milliseconds < 1000) {
    return `${milliseconds.toFixed(2)} ms`;
  } else {
    return `${(milliseconds / 1000).toFixed(2)} s`;
  }
}

export function measurePerformance<T>(fn: () => T): { result: T; time: number } {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  return { result, time: end - start };
}

export async function measureAsyncPerformance<T>(
  fn: () => Promise<T>
): Promise<{ result: T; time: number }> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  return { result, time: end - start };
}

export function comparePerformance(
  time1: number,
  time2: number
): { faster: 'first' | 'second'; ratio: number } {
  if (time1 < time2) {
    return { faster: 'first', ratio: time2 / time1 };
  } else {
    return { faster: 'second', ratio: time1 / time2 };
  }
}
