export async function waitMs(ms: number): Promise<void> {
  return new Promise((resolve: (value: void) => void) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
