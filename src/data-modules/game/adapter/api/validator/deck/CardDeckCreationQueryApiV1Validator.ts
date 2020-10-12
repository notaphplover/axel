import {
  JsonSchemaFileValidator,
  jsonSchemaAdapter,
} from '../../../../../../json-schema/adapter';
import { inject, injectable } from 'inversify';
import Ajv from 'ajv';
import { CardDeckCreationQueryApiV1 } from '../../query/deck/CardDeckCreationQueryApiV1';
import { join } from 'path';

@injectable()
export class CardDeckCreationQueryApiV1Validator extends JsonSchemaFileValidator<
  CardDeckCreationQueryApiV1
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
        'CardDeckCreationQueryApiV1.schema',
      ),
    );
  }
}
