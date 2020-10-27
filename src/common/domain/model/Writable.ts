export type Writable<TModel> = {
  -readonly [TKey in keyof TModel]: TModel[TKey];
};
