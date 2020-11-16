export interface UpdateRepository<TModel, TQuery> {
  update(query: TQuery): Promise<void>;

  updateAndSelect(query: TQuery): Promise<TModel[]>;

  updateOne(query: TQuery): Promise<void>;

  updateOneAndSelect(query: TQuery): Promise<TModel | null>;
}
