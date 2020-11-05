import { BaseTaskGraphNode, TaskGraphNode } from '../../../task-graph/domain';
import { Capsule, Interactor } from '../../../../common/domain';
import { inject, injectable } from 'inversify';
import { USER_DOMAIN_TYPES } from '../../domain/config/types';
import { USER_E2E_TYPES } from '../config/types/e2eTypes';
import { User } from '../../domain';
import { UserToken } from '../../domain/model/UserToken';

@injectable()
export class CreateUserTokenTaskGraphNode extends BaseTaskGraphNode<
  symbol,
  UserToken
> {
  constructor(
    @inject(USER_E2E_TYPES.CREATE_USER_TASK_GRAPH_NODE)
    private readonly createUserTaskGraphNode: TaskGraphNode<symbol, User>,
    @inject(USER_DOMAIN_TYPES.interactor.CREATE_USER_TOKEN_INTERACTOR)
    private readonly createUserTokenInteractor: Interactor<
      User,
      Promise<UserToken>
    >,
  ) {
    super(
      [USER_E2E_TYPES.CREATE_USER_TASK_GRAPH_NODE],
      USER_E2E_TYPES.CREATE_USER_TOKEN_TASK_GRAPH_NODE,
    );
  }

  protected async innerPerform(): Promise<UserToken> {
    const userFromTaskGraphNode: User = (this.createUserTaskGraphNode.getOutput() as Capsule<
      User
    >).elem;

    return this.createUserTokenInteractor.interact(userFromTaskGraphNode);
  }
}
