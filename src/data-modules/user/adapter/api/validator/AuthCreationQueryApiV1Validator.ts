import { inject, injectable } from 'inversify';
import Joi from 'joi';

import { JoiObjectValidator } from '../../../../../integration-modules/joi/adapter';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { AuthCreationQueryApiV1 } from '../query/AuthCreationQueryApiV1';

@injectable()
export class AuthCreationQueryApiV1Validator extends JoiObjectValidator<AuthCreationQueryApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      USER_ADAPTER_TYPES.api.validator.schema
        .AUTH_CREATION_QUERY_API_V1_JOI_VALIDATOR_SCHEMA,
    )
    authCreationQueryApiV1JoiValidator: Joi.ObjectSchema<AuthCreationQueryApiV1>,
  ) {
    super(authCreationQueryApiV1JoiValidator);
  }
}
