import { inject, injectable } from 'inversify';
import Joi from 'joi';
import { JoiObjectValidator } from '../../../../../integration-modules/joi/adapter';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { UserCreationQueryApiV1 } from '../query/UserCreationQueryApiV1';

@injectable()
export class UserCreationQueryApiV1Validator extends JoiObjectValidator<UserCreationQueryApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      USER_ADAPTER_TYPES.api.validator.schema
        .USER_CREATION_QUERY_API_V1_JOI_VALIDATOR,
    )
    userCreationQueryApiV1JoiValidator: Joi.ObjectSchema<UserCreationQueryApiV1>,
  ) {
    super(userCreationQueryApiV1JoiValidator);
  }
}
