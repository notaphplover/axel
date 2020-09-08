import Ajv, { ErrorObject } from 'ajv';
import { ValidationResult, Validator } from '../../../common/domain';
import { inject, injectable, unmanaged } from 'inversify';
import { JSON_SCHEMA_ADAPTER_TYPES } from '../config/types';

@injectable()
export abstract class JsonSchemaValidator<T> implements Validator<T> {
  private readonly validator: Ajv.ValidateFunction;

  constructor(
    @inject(JSON_SCHEMA_ADAPTER_TYPES.validator.AJV) ajv: Ajv.Ajv,
    @unmanaged() schema: Record<string, unknown>,
  ) {
    this.validator = ajv.compile(schema);
  }

  public validate(value: unknown): ValidationResult<T> {
    const isValidValue: boolean = this.validator(value) as boolean;

    if (isValidValue) {
      return {
        model: value as T,
        result: true,
      };
    } else {
      return {
        errorMessage: (this.validator.errors as ErrorObject[])
          .map((error: ErrorObject) => error.message)
          .join('\n'),
        result: false,
      };
    }
  }
}
