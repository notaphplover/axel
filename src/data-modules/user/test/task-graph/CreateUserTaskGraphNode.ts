import { BaseTaskGraphNode } from '../../../task-graph/domain';
import { Interactor } from '../../../../common/domain';
import { User } from '../../domain/model/User';
import { UserCreationQuery } from '../../domain/query/UserCreationQuery';
import { injectable } from 'inversify';
import { userCreationQuery } from '../fixtures/domain/query/fixtures';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export abstract class CreateUserTaskGraphNode<TId> extends BaseTaskGraphNode<
  TId,
  User
> {
  constructor(
    dependsOn: Iterable<TId>,
    id: TId,
    private readonly createUsersInteractor: Interactor<
      UserCreationQuery,
      Promise<User[]>
    >,
  ) {
    super(dependsOn, id);
  }

  protected async innerPerform(): Promise<User> {
    const uuidV4: string = uuidv4();

    const [userCreated]: User[] = await this.createUsersInteractor.interact({
      email: uuidV4 + userCreationQuery.email,
      password: userCreationQuery.password,
      roles: userCreationQuery.roles,
      username: userCreationQuery.username + uuidV4,
    });

    return userCreated;
  }
}
