import { inject, injectable } from 'inversify';
import Ajv from 'ajv';
import { JsonSchemaFileValidator } from '../../../../../json-schema/adapter';
import { UserCreationQueryApiV1 } from '../query/UserCreationQueryApiV1';
import { join } from 'path';
import { jsonSchemaAdapter } from '../../../../../json-schema/adapter';

@injectable()
export class UserCreationQueryApiV1Validator extends JsonSchemaFileValidator<
  UserCreationQueryApiV1
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
        'UserCreationQueryApiV1.schema',
      ),
    );
  }
}
