import { injectable, unmanaged } from 'inversify';
import { v4 as uuidv4 } from 'uuid';

import { commonDomain, Interactor } from '../../../../common/domain';
import { BaseTaskGraphNode } from '../../../task-graph/domain';
import { User } from '../../domain/model/User';
import { UserCreationQuery } from '../../domain/query/UserCreationQuery';
import { userCreationQuery } from '../fixtures/domain/query/fixtures';

@injectable()
export abstract class CreateUserTaskGraphNode<TId> extends BaseTaskGraphNode<
  TId,
  User
> {
  constructor(
    @unmanaged()
    dependsOn: Iterable<TId>,
    @unmanaged()
    id: TId,
    @unmanaged()
    private readonly createUsersInteractor: Interactor<
      UserCreationQuery,
      Promise<User[]>
    >,
  ) {
    super(dependsOn, id);
  }

  protected async innerPerform(): Promise<User> {
    const uuidV4: string = uuidv4();

    const usersCreated: User[] = await this.createUsersInteractor.interact({
      email: uuidV4 + userCreationQuery.email,
      password: userCreationQuery.password,
      roles: userCreationQuery.roles,
      username: userCreationQuery.username + uuidV4,
    });

    if (commonDomain.utils.hasOneElement(usersCreated)) {
      const [userCreated]: [User] = usersCreated;

      return userCreated;
    } else {
      throw new Error('Expected one entity to be created');
    }
  }
}
