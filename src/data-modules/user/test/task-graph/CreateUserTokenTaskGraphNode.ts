import { injectable, unmanaged } from 'inversify';

import { Interactor } from '../../../../common/domain';
import {
  BaseTaskGraphNode,
  TaskGraph,
  TaskGraphNode,
} from '../../../task-graph/domain';
import { User } from '../../domain';
import { UserToken } from '../../domain/model/UserToken';

@injectable()
export abstract class CreateUserTokenTaskGraphNode<
  TId,
> extends BaseTaskGraphNode<TId, UserToken> {
  constructor(
    @unmanaged()
    dependsOn: Iterable<TId>,
    @unmanaged()
    id: TId,
    @unmanaged()
    private readonly createUserTaskGraphNodeId: TId,
    @unmanaged()
    private readonly currentTaskGraph: TaskGraph<TId>,
    @unmanaged()
    private readonly createUserTokenInteractor: Interactor<
      User,
      Promise<UserToken>
    >,
  ) {
    super(dependsOn, id);
  }

  protected async innerPerform(): Promise<UserToken> {
    const createUserTaskGraphNode: TaskGraphNode<TId, User> =
      this.currentTaskGraph.getNode(
        this.createUserTaskGraphNodeId,
      ) as TaskGraphNode<TId, User>;
    const userFromTaskGraphNode: User = createUserTaskGraphNode.getOutput();

    return this.createUserTokenInteractor.interact(userFromTaskGraphNode);
  }
}
