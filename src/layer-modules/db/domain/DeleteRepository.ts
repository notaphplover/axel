export interface DeleteRepository<TQuery> {
  delete(query: TQuery): Promise<void>;
}
