import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import {
  Converter,
  Interactor,
  ValueOrErrors,
} from '../../../../../common/domain';
import { PostEntityRequestHandler } from '../../../../../integration-modules/fastify/adapter';
import { USER_DOMAIN_TYPES } from '../../../domain/config/types';
import { User } from '../../../domain/model/User';
import { UserCreationQuery } from '../../../domain/query/UserCreationQuery';
import { UserApiV1 } from '../../api/model/UserApiV1';
import { UserCreationQueryApiV1 } from '../../api/query/UserCreationQueryApiV1';
import { USER_ADAPTER_TYPES } from '../../config/types';

@injectable()
export class PostUserV1RequestHandler extends PostEntityRequestHandler<
  User,
  UserApiV1,
  UserCreationQueryApiV1
> {
  constructor(
    @inject(USER_DOMAIN_TYPES.interactor.CREATE_USERS_INTERACTOR)
    createUsersInteractor: Interactor<UserCreationQuery, Promise<User[]>>,

    @inject(
      USER_ADAPTER_TYPES.server.converter
        .POST_USER_V1_REQUEST_TO_USER_CREATION_QUERY_CONVERTER,
    )
    postUserV1RequestToUserCreationQueryConverter: Converter<
      fastify.FastifyRequest,
      Promise<ValueOrErrors<UserCreationQuery>>
    >,
    @inject(USER_ADAPTER_TYPES.api.converter.USER_TO_USER_API_V1_CONVERTER)
    userToUserApiV1Converter: Converter<User, UserApiV1>,
  ) {
    super(
      userToUserApiV1Converter,
      createUsersInteractor,
      postUserV1RequestToUserCreationQueryConverter,
    );
  }
}
