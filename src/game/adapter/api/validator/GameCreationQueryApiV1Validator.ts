import * as validationSchema from '../../json-schema/GameCreationQueryApiV1.schema';
import { inject, injectable } from 'inversify';
import Ajv from 'ajv';
import { GameCreationQueryApiV1 } from '../query/GameCreationQueryApiV1';
import { JsonSchemaValidator } from '../../../../json-schema/adapter';
import { jsonSchemaAdapter } from '../../../../json-schema/adapter';

@injectable()
export class GameCreationQueryApiV1Validator extends JsonSchemaValidator<
  GameCreationQueryApiV1
> {
  constructor(
    @inject(jsonSchemaAdapter.config.types.validator.AJV) ajv: Ajv.Ajv,
  ) {
    super(ajv, validationSchema);
  }
}
