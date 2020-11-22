import { inject, injectable } from 'inversify';
import { CreateUserTokenTaskGraphNode } from './CreateUserTokenTaskGraphNode';
import { Interactor } from '../../../../common/domain';
import { TaskGraph } from '../../../task-graph/domain';
import { USER_DOMAIN_TYPES } from '../../domain/config/types';
import { USER_E2E_TYPES } from '../config/types/e2eTypes';
import { User } from '../../domain';
import { UserToken } from '../../domain/model/UserToken';
import { commonTest } from '../../../../common/test';

@injectable()
export class CreateFirstUserTokenTaskGraphNode extends CreateUserTokenTaskGraphNode<symbol> {
  constructor(
    @inject(commonTest.config.types.taskGraph.CURRENT_TASK_GRAPH)
    currentTaskGraph: TaskGraph<symbol>,
    @inject(USER_DOMAIN_TYPES.interactor.CREATE_USER_TOKEN_INTERACTOR)
    createUserTokenInteractor: Interactor<User, Promise<UserToken>>,
  ) {
    super(
      [USER_E2E_TYPES.CREATE_FIRST_USER_TASK_GRAPH_NODE],
      USER_E2E_TYPES.CREATE_FIRST_USER_TOKEN_TASK_GRAPH_NODE,
      USER_E2E_TYPES.CREATE_FIRST_USER_TASK_GRAPH_NODE,
      currentTaskGraph,
      createUserTokenInteractor,
    );
  }
}
