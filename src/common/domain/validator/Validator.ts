import { ValidationResult } from './ValidationResult';

export interface Validator<
  TResult = unknown,
  TValue = unknown,
  TContext = void,
> {
  validate(value: TValue, context: TContext): ValidationResult<TResult>;
}
