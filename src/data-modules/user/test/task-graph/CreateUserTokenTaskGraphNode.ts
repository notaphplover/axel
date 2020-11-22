import {
  BaseTaskGraphNode,
  TaskGraph,
  TaskGraphNode,
} from '../../../task-graph/domain';
import { Capsule, Interactor } from '../../../../common/domain';
import { User } from '../../domain';
import { UserToken } from '../../domain/model/UserToken';
import { injectable } from 'inversify';

@injectable()
export abstract class CreateUserTokenTaskGraphNode<
  TId
> extends BaseTaskGraphNode<TId, UserToken> {
  constructor(
    dependsOn: Iterable<TId>,
    id: TId,
    private readonly createUserTaskGraphNodeId: TId,
    private readonly currentTaskGraph: TaskGraph<TId>,
    private readonly createUserTokenInteractor: Interactor<
      User,
      Promise<UserToken>
    >,
  ) {
    super(dependsOn, id);
  }

  protected async innerPerform(): Promise<UserToken> {
    const createUserTaskGraphNode: TaskGraphNode<
      TId,
      User
    > = this.currentTaskGraph.getNode(
      this.createUserTaskGraphNodeId,
    ) as TaskGraphNode<TId, User>;
    const userFromTaskGraphNode: User = (createUserTaskGraphNode.getOutput() as Capsule<User>)
      .elem;

    return this.createUserTokenInteractor.interact(userFromTaskGraphNode);
  }
}
