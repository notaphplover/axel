export interface Validator<T> {
  validate(value: unknown): value is T;
}
