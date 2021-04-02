export interface Builder<TObject, TOptions = void> {
  build(options: TOptions): TObject;
}
