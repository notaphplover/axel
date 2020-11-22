import { ContainerModule, interfaces } from 'inversify';
import { CreateFirstUserTaskGraphNode } from '../../task-graph/CreateFirstUserTaskGraphNode';
import { CreateFirstUserTokenTaskGraphNode } from '../../task-graph/CreateFirstUserTokenTaskGraphNode';
import { USER_E2E_TYPES } from '../types/e2eTypes';

export function bindE2E(bind: interfaces.Bind): void {
  bind(USER_E2E_TYPES.CREATE_FIRST_USER_TASK_GRAPH_NODE).to(
    CreateFirstUserTaskGraphNode,
  );
  bind(USER_E2E_TYPES.CREATE_FIRST_USER_TOKEN_TASK_GRAPH_NODE).to(
    CreateFirstUserTokenTaskGraphNode,
  );
}

export const userTestE2eContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindE2E(bind);
  },
);
