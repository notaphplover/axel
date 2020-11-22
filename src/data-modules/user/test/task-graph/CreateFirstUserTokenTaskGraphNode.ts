import {
  BaseTaskGraphNode,
  TaskGraph,
  TaskGraphNode,
} from '../../../task-graph/domain';
import { Capsule, Interactor } from '../../../../common/domain';
import { inject, injectable } from 'inversify';
import { USER_DOMAIN_TYPES } from '../../domain/config/types';
import { USER_E2E_TYPES } from '../config/types/e2eTypes';
import { User } from '../../domain';
import { UserToken } from '../../domain/model/UserToken';
import { commonTest } from '../../../../common/test';

@injectable()
export class CreateFirstUserTokenTaskGraphNode extends BaseTaskGraphNode<
  symbol,
  UserToken
> {
  constructor(
    @inject(commonTest.config.types.taskGraph.CURRENT_TASK_GRAPH)
    private readonly currentTaskGraph: TaskGraph<symbol>,
    @inject(USER_DOMAIN_TYPES.interactor.CREATE_USER_TOKEN_INTERACTOR)
    private readonly createUserTokenInteractor: Interactor<
      User,
      Promise<UserToken>
    >,
  ) {
    super(
      [USER_E2E_TYPES.CREATE_FIRST_USER_TASK_GRAPH_NODE],
      USER_E2E_TYPES.CREATE_FIRST_USER_TOKEN_TASK_GRAPH_NODE,
    );
  }

  protected async innerPerform(): Promise<UserToken> {
    const createUserTaskGraphNode: TaskGraphNode<
      symbol,
      User
    > = this.currentTaskGraph.getNode(
      USER_E2E_TYPES.CREATE_FIRST_USER_TASK_GRAPH_NODE,
    ) as TaskGraphNode<symbol, User>;
    const userFromTaskGraphNode: User = (createUserTaskGraphNode.getOutput() as Capsule<User>)
      .elem;

    return this.createUserTokenInteractor.interact(userFromTaskGraphNode);
  }
}
