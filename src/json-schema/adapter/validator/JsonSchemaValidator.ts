import Ajv from 'ajv';
import { Validator } from '../../../common/domain';

export abstract class JsonSchemaValidator<T> implements Validator<T> {
  private readonly validator: Ajv.ValidateFunction;

  constructor(schema: Record<string, unknown>) {
    const ajv: Ajv.Ajv = new Ajv();
    this.validator = ajv.compile(schema);
  }

  public validate(value: unknown): value is T {
    return this.validator(value) as boolean;
  }
}
