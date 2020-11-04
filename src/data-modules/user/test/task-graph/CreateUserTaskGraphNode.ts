import { inject, injectable } from 'inversify';
import { BaseTaskGraphNode } from '../../../task-graph/domain';
import { Interactor } from '../../../../common/domain';
import { USER_DOMAIN_TYPES } from '../../domain/config/types';
import { USER_E2E_TYPES } from '../config/types/e2eTypes';
import { User } from '../../domain/model/User';
import { UserCreationQuery } from '../../domain/query/UserCreationQuery';
import { commonTest } from '../../../../common/test';
import { userCreationQuery } from '../fixtures/domain/query/fixtures';

@injectable()
export class CreateUserTaskGraphNode extends BaseTaskGraphNode<symbol, User> {
  constructor(
    @inject(commonTest.config.types.utils.NUMERIC_SEQUENCE)
    private readonly numericSequence: IterableIterator<number>,
    @inject(USER_DOMAIN_TYPES.interactor.CREATE_USERS_INTERACTOR)
    private readonly createUsersInteractor: Interactor<
      UserCreationQuery,
      Promise<User[]>
    >,
  ) {
    super([], USER_E2E_TYPES.CREATE_USER_TASK_GRAPH_NODE);
  }

  protected async innerPerform(): Promise<User> {
    const nextNumberResult: IteratorResult<
      number,
      number
    > = this.numericSequence.next();

    if (nextNumberResult.done !== false) {
      throw new Error('Unable to build user: missing numeric sequence value');
    }

    const nextNumberStringified: string = nextNumberResult.value.toString();

    const [userCreated]: User[] = await this.createUsersInteractor.interact({
      email: nextNumberStringified + userCreationQuery.email,
      password: userCreationQuery.password,
      roles: userCreationQuery.roles,
      username: userCreationQuery.username + nextNumberStringified,
    });

    return userCreated;
  }
}
