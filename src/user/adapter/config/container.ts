import { ContainerModule, interfaces } from 'inversify';
import { USER_ADAPTER_TYPES } from './types';
import { USER_DOMAIN_TYPES } from '../../domain/config/types';
import { UserDbSearchReporitory } from '../db/repository/UserDbSearchRepository';
import { UserDbToUserConverter } from '../db/converter/UserDbToUserConverter';
import { UserFindQueryToUserDbFilterQueryConverter } from '../db/converter/UserFindQueryToUserDbFilterQueryConverter';
import { userDbModel } from '../db/model/UserDb';

function bindAdapters(bind: interfaces.Bind) {
  bind(USER_ADAPTER_TYPES.db.converter.USER_DB_TO_USER_CONVERTER).to(
    UserDbToUserConverter,
  );
  bind(
    USER_ADAPTER_TYPES.db.converter
      .USER_FIND_QUERY_TO_USER_DB_FILTER_QUERY_CONVERTER,
  ).to(UserFindQueryToUserDbFilterQueryConverter);
  bind(USER_ADAPTER_TYPES.db.model.USER_DB_MODEL).toConstantValue(userDbModel);
}

function bindDomain(bind: interfaces.Bind) {
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
