import { ContainerModule, interfaces } from 'inversify';
import { CreateVoidLandDbTaskGraphNode } from '../../task-graph/card/CreateVoidLandDbTaskGraphNode';
import { GAME_E2E_TYPES } from '../types/e2eTypes';

export function bindE2e(bind: interfaces.Bind): void {
  bind(GAME_E2E_TYPES.card.CREATE_VOID_LAND_DB_TASK_GRAPH_NODE).to(
    CreateVoidLandDbTaskGraphNode,
  );
}

export const gameTestE2eContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindE2e(bind);
  },
);
