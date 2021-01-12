import { Validator } from './Validator';

export type ContextBasedValidator<TModel, TContext> = Validator<
  TModel,
  unknown,
  TContext
>;
