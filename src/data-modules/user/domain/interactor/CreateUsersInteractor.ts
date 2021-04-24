import { inject, injectable } from 'inversify';

import { CreateEntitiesInteractor } from '../../../../common/domain';
import { InsertRepository } from '../../../../layer-modules/db/domain';
import { USER_DOMAIN_TYPES } from '../config/types';
import { User } from '../model/User';
import { UserCreationQuery } from '../query/UserCreationQuery';

@injectable()
export class CreateUsersInteractor extends CreateEntitiesInteractor<
  User,
  UserCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(USER_DOMAIN_TYPES.repository.USER_INSERT_REPOSITORY)
    userInsertRepository: InsertRepository<User, UserCreationQuery>,
  ) {
    super(userInsertRepository);
  }
}
