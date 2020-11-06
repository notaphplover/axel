import { inject, injectable } from 'inversify';
import { BaseTaskGraphNode } from '../../../task-graph/domain';
import { Interactor } from '../../../../common/domain';
import { USER_DOMAIN_TYPES } from '../../domain/config/types';
import { USER_E2E_TYPES } from '../config/types/e2eTypes';
import { User } from '../../domain/model/User';
import { UserCreationQuery } from '../../domain/query/UserCreationQuery';
import { userCreationQuery } from '../fixtures/domain/query/fixtures';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class CreateUserTaskGraphNode extends BaseTaskGraphNode<symbol, User> {
  constructor(
    @inject(USER_DOMAIN_TYPES.interactor.CREATE_USERS_INTERACTOR)
    private readonly createUsersInteractor: Interactor<
      UserCreationQuery,
      Promise<User[]>
    >,
  ) {
    super([], USER_E2E_TYPES.CREATE_USER_TASK_GRAPH_NODE);
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
