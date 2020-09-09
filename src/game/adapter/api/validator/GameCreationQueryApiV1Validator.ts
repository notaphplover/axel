import { inject, injectable } from 'inversify';
import Ajv from 'ajv';
import { GameCreationQueryApiV1 } from '../query/GameCreationQueryApiV1';
import { JsonSchemaFileValidator } from '../../../../json-schema/adapter';
import { join } from 'path';
import { jsonSchemaAdapter } from '../../../../json-schema/adapter';

@injectable()
export class GameCreationQueryApiV1Validator extends JsonSchemaFileValidator<
  GameCreationQueryApiV1
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
        'GameCreationQueryApiV1.schema',
      ),
    );
  }
}
