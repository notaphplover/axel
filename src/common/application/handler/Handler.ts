export interface Handler<TInput, TOutput> {
  handle(query: TInput): TOutput;
}
