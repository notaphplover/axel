import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../common/domain';
import { commonTest } from '../../../../common/test';
import { TaskGraph } from '../../../task-graph/domain';
import { User } from '../../domain';
import { USER_DOMAIN_TYPES } from '../../domain/config/types';
import { UserToken } from '../../domain/model/UserToken';
import { USER_E2E_TYPES } from '../config/types/e2eTypes';
import { CreateUserTokenTaskGraphNode } from './CreateUserTokenTaskGraphNode';

@injectable()
export class CreateSecondUserTokenTaskGraphNode extends CreateUserTokenTaskGraphNode<symbol> {
  constructor(
    @inject(commonTest.config.types.taskGraph.CURRENT_TASK_GRAPH)
    currentTaskGraph: TaskGraph<symbol>,
    @inject(USER_DOMAIN_TYPES.interactor.CREATE_USER_TOKEN_INTERACTOR)
    createUserTokenInteractor: Interactor<User, Promise<UserToken>>,
  ) {
    super(
      [USER_E2E_TYPES.CREATE_SECOND_USER_TASK_GRAPH_NODE],
      USER_E2E_TYPES.CREATE_SECOND_USER_TOKEN_TASK_GRAPH_NODE,
      USER_E2E_TYPES.CREATE_SECOND_USER_TASK_GRAPH_NODE,
      currentTaskGraph,
      createUserTokenInteractor,
    );
  }
}
