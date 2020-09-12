export interface InsertRepository<TModel, TQuery> {
  insert(query: TQuery): Promise<TModel[]>;
}
