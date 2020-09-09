export interface SearchRepository<TModel, TQuery> {
  find(query: TQuery): Promise<TModel[]>;

  findOne(query: TQuery): Promise<TModel | null>;
}
