import { ValidationResult } from './ValidationResult';

export interface AsyncValidator<
  TResult = unknown,
  TValue = unknown,
  TContext = void,
> {
  validate(
    value: TValue,
    context: TContext,
  ): Promise<ValidationResult<TResult>>;
}
