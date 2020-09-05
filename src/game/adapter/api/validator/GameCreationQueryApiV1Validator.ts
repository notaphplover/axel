import * as validationSchema from '../../json-schema/GameCreationQueryApiV1.schema';
import { GameCreationQueryApiV1 } from '../query/GameCreationQueryApiV1';
import { JsonSchemaValidator } from '../../../../json-schema/adapter';

export class GameCreationQueryApiV1Validator extends JsonSchemaValidator<
  GameCreationQueryApiV1
> {
  constructor() {
    super(validationSchema);
  }
}
