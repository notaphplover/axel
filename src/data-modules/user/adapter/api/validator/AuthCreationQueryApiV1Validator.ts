import { inject, injectable } from 'inversify';
import Ajv from 'ajv';
import { AuthCreationQueryApiV1 } from '../query/AuthCreationQueryApiV1';
import { JsonSchemaFileValidator } from '../../../../../json-schema/adapter';
import { join } from 'path';
import { jsonSchemaAdapter } from '../../../../../json-schema/adapter';

@injectable()
export class AuthCreationQueryApiV1Validator extends JsonSchemaFileValidator<
  AuthCreationQueryApiV1
> {
  constructor(
    @inject(jsonSchemaAdapter.config.types.validator.AJV) ajv: Ajv.Ajv,
  ) {
    super(
      ajv,
      join(
        __dirname,
        '..',
        '..',
        'json-schema',
        'AuthCreationQueryApiV1.schema',
      ),
    );
  }
}
