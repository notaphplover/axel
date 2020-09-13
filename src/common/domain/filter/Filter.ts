export interface Filter<TModel, TFilter> {
  filter(models: TModel[], filter: TFilter): Promise<TModel[]>;

  filterOne(model: TModel, filter: TFilter): Promise<TModel | null>;
}
