import { ContainerModule, interfaces } from 'inversify';
import { CreateUserTaskGraphNode } from '../../task-graph/CreateUserTaskGraphNode';
import { CreateUserTokenTaskGraphNode } from '../../task-graph/CreateUserTokenTaskGraphNode';
import { USER_E2E_TYPES } from '../types/e2eTypes';

export function bindE2E(bind: interfaces.Bind): void {
  bind(USER_E2E_TYPES.CREATE_USER_TASK_GRAPH_NODE).to(CreateUserTaskGraphNode);
  bind(USER_E2E_TYPES.CREATE_USER_TOKEN_TASK_GRAPH_NODE).to(
    CreateUserTokenTaskGraphNode,
  );
}

export const userTestE2eContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindE2E(bind);
  },
);
