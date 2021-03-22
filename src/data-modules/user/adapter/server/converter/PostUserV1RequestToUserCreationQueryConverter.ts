import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import {
  Converter,
  Validator,
  ValueOrErrors,
} from '../../../../../common/domain';
import { RequestToQueryConverter } from '../../../../../layer-modules/server/adapter';
import { UserCreationQuery } from '../../../domain/query/UserCreationQuery';
import { UserCreationQueryApiV1 } from '../../api/query/UserCreationQueryApiV1';
import { USER_ADAPTER_TYPES } from '../../config/types';

@injectable()
export class PostUserV1RequestToUserCreationQueryConverter extends RequestToQueryConverter<
  fastify.FastifyRequest,
  UserCreationQuery,
  UserCreationQueryApiV1
> {
  constructor(
    @inject(
      USER_ADAPTER_TYPES.api.converter
        .USER_CREATION_QUERY_API_V1_TO_USER_CREATION_QUERY_CONVERTER,
    )
    userCreationQueryApiV1ToUserCreationQueryConverter: Converter<
      UserCreationQueryApiV1,
      Promise<UserCreationQuery>
    >,
    @inject(
      USER_ADAPTER_TYPES.api.validator.AUTH_CREATION_QUERY_API_V1_VALIDATOR,
    )
    userCreationQueryApiV1Validator: Validator<UserCreationQueryApiV1>,
  ) {
    super(
      undefined,
      userCreationQueryApiV1ToUserCreationQueryConverter,
      userCreationQueryApiV1Validator,
    );
  }

  protected extractRequestQuery(request: fastify.FastifyRequest): unknown {
    return request.body;
  }
  protected async getContextOrErrors(): Promise<ValueOrErrors<void>> {
    const voidContextValue: ValueOrErrors<void> = {
      isEither: false,
      value: undefined,
    };

    return voidContextValue;
  }
}
