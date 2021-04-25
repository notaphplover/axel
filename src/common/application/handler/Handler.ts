export interface Handler<TModel, TQuery> {
  handle(query: TQuery): Promise<TModel>;
}
