export class NumericSequence implements IterableIterator<number> {
  constructor(
    private readonly increment: number = 1,
    private value: number = 0,
  ) {}

  public [Symbol.iterator](): IterableIterator<number> {
    return this;
  }

  public next(): IteratorResult<number, number> {
    const result: IteratorResult<number, number> = {
      done: false,
      value: this.value,
    };

    this.value += this.increment;

    return result;
  }
}
