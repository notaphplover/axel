import { ContainerModule, interfaces } from 'inversify';
import { CreateUserDbTaskGraphNode } from '../../task-graph/CreateUserDbTaskGraphNode';
import { USER_E2E_TYPES } from '../types/e2eTypes';

export function bindE2E(bind: interfaces.Bind): void {
  bind(USER_E2E_TYPES.CREATE_USER_DB_TASK_GRAPH_NODE).to(
    CreateUserDbTaskGraphNode,
  );
}

export const userTestE2eContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindE2E(bind);
  },
);
