export interface FixtureFactory<TData> {
  get(): TData;
}
