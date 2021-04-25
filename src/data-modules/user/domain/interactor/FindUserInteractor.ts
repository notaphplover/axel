import { inject, injectable } from 'inversify';

import { FindEntityInteractor } from '../../../../common/domain';
import { SearchRepository } from '../../../../layer-modules/db/domain';
import { USER_DOMAIN_TYPES } from '../config/types';
import { User } from '../model/User';
import { UserFindQuery } from '../query/UserFindQuery';

@injectable()
export class FindUserInteractor extends FindEntityInteractor<
  User,
  UserFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(USER_DOMAIN_TYPES.repository.USER_SEARCH_REPOSITORY)
    userSearchRepository: SearchRepository<User, UserFindQuery>,
  ) {
    super(userSearchRepository);
  }
}
