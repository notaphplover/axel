export interface Converter<TInput, TOutput> {
  transform(input: TInput): TOutput;
}
