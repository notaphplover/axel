export interface Port<TInput, TOutput> {
  transform(input: TInput): TOutput;
}
