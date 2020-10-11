import { inject, injectable } from 'inversify';
import Ajv from 'ajv';
import { CardFindQueryApiV1 } from '../../query/card/CardFindQueryApiV1';
import { JsonSchemaFileValidator } from '../../../../../../json-schema/adapter';
import { join } from 'path';
import { jsonSchemaAdapter } from '../../../../../../json-schema/adapter';

@injectable()
export class CardFindQueryApiV1Validator extends JsonSchemaFileValidator<
  CardFindQueryApiV1
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
        'CardFindQueryApiV1.schema',
      ),
    );
  }
}
