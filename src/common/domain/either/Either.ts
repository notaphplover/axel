export type Either<TValue, TEither> =
  | EitherEither<TEither>
  | ValueEither<TValue>;

export interface EitherEither<TEither> {
  isEither: true;
  value: TEither;
}

export interface ValueEither<TValue> {
  isEither: false;
  value: TValue;
}
