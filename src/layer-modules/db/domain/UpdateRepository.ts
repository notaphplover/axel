export interface UpdateRepository<TModel, TQuery> {
  update(query: TQuery): Promise<TModel[]>;

  updateOne(query: TQuery): Promise<TModel | null>;
}
