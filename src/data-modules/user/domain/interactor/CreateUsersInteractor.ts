import { inject, injectable } from 'inversify';
import { InsertRepository } from '../../../../layer-modules/db/domain';
import { Interactor } from '../../../../common/domain';
import { USER_DOMAIN_TYPES } from '../config/types';
import { User } from '../model/User';
import { UserCreationQuery } from '../query/UserCreationQuery';

@injectable()
export class CreateUsersInteractor
  implements Interactor<UserCreationQuery, Promise<User[]>> {
  constructor(
    @inject(USER_DOMAIN_TYPES.repository.USER_INSERT_REPOSITORY)
    private readonly userInsertRepository: InsertRepository<
      User,
      UserCreationQuery
    >,
  ) {}

  public async interact(query: UserCreationQuery): Promise<User[]> {
    const usersCreated: User[] = await this.userInsertRepository.insert(query);

    return usersCreated;
  }
}
