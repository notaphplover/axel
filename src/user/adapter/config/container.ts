import { ContainerModule, interfaces } from 'inversify';
import { CreateUsersInteractor } from '../../domain/interactor/CreateUsersInteractor';
import { FindUserInteractor } from '../../domain/interactor/FindUserInteractor';
import { PasswordHasher } from '../security/PasswordHasher';
import { PostUserDbSearchFilter } from '../db/filter/PostUserDbSearchFilter';
import { PostUserV1RequestHandler } from '../server/reqHandler/PostUserV1RequestHandler';
import { USER_ADAPTER_TYPES } from './types';
import { USER_DOMAIN_TYPES } from '../../domain/config/types';
import { UserCreationQueryApiV1Validator } from '../api/validator/UserCreationQueryApiV1Validator';
import { UserCreationQueryToUserDbsConverter } from '../db/converter/UserCreationQueryToUserDbsConverter';
import { UserDbInsertRepository } from '../db/repository/UserDbInsertRepository';
import { UserDbSearchReporitory } from '../db/repository/UserDbSearchRepository';
import { UserDbToUserConverter } from '../db/converter/UserDbToUserConverter';
import { UserFindQueryToUserDbFilterQueryConverter } from '../db/converter/UserFindQueryToUserDbFilterQueryConverter';
import { UserRouter } from '../server/router/UserRouter';
import { UserToUserApiV1Converter } from '../api/converter/UserToUserApiV1Converter';
import { userDbModel } from '../db/model/UserDb';

function bindAdapters(bind: interfaces.Bind) {
  bind(USER_ADAPTER_TYPES.api.converter.USER_TO_USER_API_V1_CONVERTER).to(
    UserToUserApiV1Converter,
  );
  bind(
    USER_ADAPTER_TYPES.api.validator.USER_CREATION_QUERY_API_V1_VALIDATOR,
  ).to(UserCreationQueryApiV1Validator);
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
  bind(USER_ADAPTER_TYPES.db.model.USER_DB_MODEL).toConstantValue(userDbModel);
  bind(USER_ADAPTER_TYPES.server.reqHandler.POST_USER_V1_REQUEST_HANDLER).to(
    PostUserV1RequestHandler,
  );
  bind(USER_ADAPTER_TYPES.security.PASSWORD_HASHER).to(PasswordHasher);
  bind(USER_ADAPTER_TYPES.server.router.USER_ROUTER).to(UserRouter);
}

function bindDomain(bind: interfaces.Bind) {
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
    UserDbSearchReporitory,
  );
}

export const userContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapters(bind);
    bindDomain(bind);
  },
);
