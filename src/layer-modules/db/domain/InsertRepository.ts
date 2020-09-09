export interface InsertRepository<TModel> {
  insert(entities: TModel[]): Promise<TModel[]>;

  insertOne(entity: TModel): Promise<TModel>;
}
