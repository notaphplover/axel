import { ValidationResult } from './ValidationResult';

export interface Validator<T> {
  validate(value: unknown): ValidationResult<T>;
}
