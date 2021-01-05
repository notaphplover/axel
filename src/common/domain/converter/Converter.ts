export interface Converter<TInput, TOutput, TContext = void> {
  transform(input: TInput, context: TContext): TOutput;
}
