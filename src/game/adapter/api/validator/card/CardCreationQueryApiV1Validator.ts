import { inject, injectable } from 'inversify';
import Ajv from 'ajv';
import { CardCreationQueryApiV1 } from '../../query/card/CardCreationQueryApiV1';
import { JsonSchemaFileValidator } from '../../../../../json-schema/adapter';
import { join } from 'path';
import { jsonSchemaAdapter } from '../../../../../json-schema/adapter';

@injectable()
export class CardCreationQueryApiV1Validator extends JsonSchemaFileValidator<
  CardCreationQueryApiV1
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
        '..',
        'json-schema',
        'CardCreationQueryApiV1.schema',
      ),
    );
  }
}
