import { ValidationResult } from './ValidationResult';

export interface ContextBasedValidator<TModel, TContext> {
  validate(value: unknown, context: TContext): ValidationResult<TModel>;
}
