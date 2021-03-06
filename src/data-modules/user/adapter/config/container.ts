import { ContainerModule, interfaces } from 'inversify';

import { USER_DOMAIN_TYPES } from '../../domain/config/types';
import { CreateUsersInteractor } from '../../domain/interactor/CreateUsersInteractor';
import { CreateUserTokenInteractor } from '../../domain/interactor/CreateUserTokenInteractor';
import { FindUserInteractor } from '../../domain/interactor/FindUserInteractor';
import { UserCreationQueryApiV1ToUserCreationQueryConverter } from '../api/converter/UserCreationQueryApiV1ToUserCreationQueryConverter';
import { UserRoleToUserRoleApiV1Converter } from '../api/converter/UserRoleToUserRoleApiV1Converter';
import { UserTokenToUserTokenApiV1Converter } from '../api/converter/UserTokenToUserTokenApiV1Converter';
import { UserToUserApiV1Converter } from '../api/converter/UserToUserApiV1Converter';
import { AuthCreationQueryApiV1Validator } from '../api/validator/AuthCreationQueryApiV1Validator';
import { authCreationQueryApiV1JoiValidatorSchema } from '../api/validator/schema/query/authCreationQueryApiV1JoiValidatorSchema';
import { userCreationQueryApiV1JoiValidatorSchema } from '../api/validator/schema/query/userCreationQueryApiV1JoiValidatorSchema';
import { UserCreationQueryApiV1Validator } from '../api/validator/UserCreationQueryApiV1Validator';
import { FastifyUserAuthenticator } from '../auth/FastifyUserAuthenticator';
import { UserCreationQueryToUserDbsConverter } from '../db/converter/UserCreationQueryToUserDbsConverter';
import { UserDbToUserConverter } from '../db/converter/UserDbToUserConverter';
import { UserFindQueryToUserDbFilterQueryConverter } from '../db/converter/UserFindQueryToUserDbFilterQueryConverter';
import { PostUserDbSearchFilter } from '../db/filter/PostUserDbSearchFilter';
import { UserDbInsertRepository } from '../db/repository/UserDbInsertRepository';
import { UserDbSearchRepository } from '../db/repository/UserDbSearchRepository';
import { UserDbCollectionName } from '../db/UserDbCollectionName';
import { PasswordHasher } from '../security/PasswordHasher';
import { PostUserV1RequestToUserCreationQueryConverter } from '../server/converter/PostUserV1RequestToUserCreationQueryConverter';
import { PostAuthTokenV1RequestHandler } from '../server/reqHandler/PostAuthUserTokenV1RequestHandler';
import { PostUserV1RequestHandler } from '../server/reqHandler/PostUserV1RequestHandler';
import { AuthRouter } from '../server/router/AuthRouter';
import { UserRouter } from '../server/router/UserRouter';
import { USER_ADAPTER_TYPES } from './types';

function bindAdapters(bind: interfaces.Bind) {
  bind(
    USER_ADAPTER_TYPES.api.converter
      .USER_CREATION_QUERY_API_V1_TO_USER_CREATION_QUERY_CONVERTER,
  ).to(UserCreationQueryApiV1ToUserCreationQueryConverter);
  bind(
    USER_ADAPTER_TYPES.api.converter.USER_ROLE_TO_USER_ROLE_API_V1_CONVERTER,
  ).to(UserRoleToUserRoleApiV1Converter);
  bind(USER_ADAPTER_TYPES.api.converter.USER_TO_USER_API_V1_CONVERTER).to(
    UserToUserApiV1Converter,
  );
  bind(
    USER_ADAPTER_TYPES.api.converter.USER_TOKEN_TO_USER_TOKEN_API_V1_CONVERTER,
  ).to(UserTokenToUserTokenApiV1Converter);

  bind(
    USER_ADAPTER_TYPES.api.validator.schema
      .AUTH_CREATION_QUERY_API_V1_JOI_VALIDATOR_SCHEMA,
  ).toConstantValue(authCreationQueryApiV1JoiValidatorSchema);
  bind(
    USER_ADAPTER_TYPES.api.validator.schema
      .USER_CREATION_QUERY_API_V1_JOI_VALIDATOR_SCHEMA,
  ).toConstantValue(userCreationQueryApiV1JoiValidatorSchema);
  bind(
    USER_ADAPTER_TYPES.api.validator.AUTH_CREATION_QUERY_API_V1_VALIDATOR,
  ).to(AuthCreationQueryApiV1Validator);
  bind(
    USER_ADAPTER_TYPES.api.validator.USER_CREATION_QUERY_API_V1_VALIDATOR,
  ).to(UserCreationQueryApiV1Validator);
  bind(USER_ADAPTER_TYPES.auth.FASTIFY_USER_AUTHENTICATOR).to(
    FastifyUserAuthenticator,
  );

  bind(USER_ADAPTER_TYPES.db.collection.USER_COLLECTION_NAME).toConstantValue(
    UserDbCollectionName.User,
  );
  bind(
    USER_ADAPTER_TYPES.db.converter.USER_CREATION_QUERY_TO_USER_DBS_CONVERTER,
  ).to(UserCreationQueryToUserDbsConverter);
  bind(USER_ADAPTER_TYPES.db.converter.USER_DB_TO_USER_CONVERTER).to(
    UserDbToUserConverter,
  );
  bind(
    USER_ADAPTER_TYPES.db.converter
      .USER_FIND_QUERY_TO_USER_DB_FILTER_QUERY_CONVERTER,
  ).to(UserFindQueryToUserDbFilterQueryConverter);
  bind(USER_ADAPTER_TYPES.db.filter.POST_USER_DB_SEARCH_FILTER).to(
    PostUserDbSearchFilter,
  );
  bind(
    USER_ADAPTER_TYPES.server.converter
      .POST_USER_V1_REQUEST_TO_USER_CREATION_QUERY_CONVERTER,
  ).to(PostUserV1RequestToUserCreationQueryConverter);
  bind(
    USER_ADAPTER_TYPES.server.reqHandler
      .POST_AUTH_USER_TOKEN_V1_REQUEST_HANDLER,
  ).to(PostAuthTokenV1RequestHandler);
  bind(USER_ADAPTER_TYPES.server.reqHandler.POST_USER_V1_REQUEST_HANDLER).to(
    PostUserV1RequestHandler,
  );
  bind(USER_ADAPTER_TYPES.security.PASSWORD_HASHER).to(PasswordHasher);
  bind(USER_ADAPTER_TYPES.server.router.AUTH_ROUTER).to(AuthRouter);
  bind(USER_ADAPTER_TYPES.server.router.USER_ROUTER).to(UserRouter);
}

function bindDomain(bind: interfaces.Bind) {
  bind(USER_DOMAIN_TYPES.interactor.CREATE_USER_TOKEN_INTERACTOR).to(
    CreateUserTokenInteractor,
  );
  bind(USER_DOMAIN_TYPES.interactor.CREATE_USERS_INTERACTOR).to(
    CreateUsersInteractor,
  );
  bind(USER_DOMAIN_TYPES.interactor.FIND_USER_INTERACTOR).to(
    FindUserInteractor,
  );
  bind(USER_DOMAIN_TYPES.repository.USER_INSERT_REPOSITORY).to(
    UserDbInsertRepository,
  );
  bind(USER_DOMAIN_TYPES.repository.USER_SEARCH_REPOSITORY).to(
    UserDbSearchRepository,
  );
}

export const userContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapters(bind);
    bindDomain(bind);
  },
);
