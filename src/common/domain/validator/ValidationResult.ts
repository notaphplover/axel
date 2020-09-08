export type ValidationResult<T> = ValidationFail | ValidationSuccess<T>;

export interface ValidationFail {
  errorMessage: string;
  result: false;
}

export interface ValidationSuccess<T> {
  model: T;
  result: true;
}
