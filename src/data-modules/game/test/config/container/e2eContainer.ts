import { ContainerModule, interfaces } from 'inversify';
import { CreateVoidLandTaskGraphNode } from '../../task-graph/card/CreateVoidLandTaskGraphNode';
import { GAME_E2E_TYPES } from '../types/e2eTypes';

export function bindE2e(bind: interfaces.Bind): void {
  bind(GAME_E2E_TYPES.card.CREATE_VOID_LAND_TASK_GRAPH_NODE).to(
    CreateVoidLandTaskGraphNode,
  );
}

export const gameTestE2eContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindE2e(bind);
  },
);
