import { Converter, Interactor } from '../../../common/domain';
import { inject, injectable } from 'inversify';
import { InsertRepository } from '../../../layer-modules/db/domain';
import { NoIdUser } from '../model/NoIdUser';
import { USER_DOMAIN_TYPES } from '../config/types';
import { User } from '../model/User';
import { UserCreationQuery } from '../query/UserCreationQuery';

@injectable()
export class CreateUsersInteractor
  implements Interactor<UserCreationQuery, Promise<User[]>> {
  constructor(
    @inject(
      USER_DOMAIN_TYPES.converter.USER_CREATION_QUERY_TO_NO_ID_USERS_CONVERTER,
    )
    private readonly UserCreationqueryToNoIdUsersConverter: Converter<
      UserCreationQuery,
      NoIdUser[]
    >,
    @inject(USER_DOMAIN_TYPES.repository.USER_INSERT_REPOSITORY)
    private readonly userInsertRepository: InsertRepository<NoIdUser, User>,
  ) {}

  public async interact(input: UserCreationQuery): Promise<User[]> {
    const users: NoIdUser[] = this.UserCreationqueryToNoIdUsersConverter.transform(
      input,
    );

    const usersCreated: User[] = await this.userInsertRepository.insert(users);

    return usersCreated;
  }
}
