export interface InsertRepository<TInModel, TOutModel> {
  insert(entities: TInModel[]): Promise<TOutModel[]>;

  insertOne(entity: TInModel): Promise<TOutModel>;
}
