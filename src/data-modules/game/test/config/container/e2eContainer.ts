import { ContainerModule, interfaces } from 'inversify';
import { CreateCardDeckOfVoidLandGraphNode } from '../../task-graph/deck/CreateCardDeckOfVoidLandGraphNode';
import { CreateVoidLandTaskGraphNode } from '../../task-graph/card/CreateVoidLandTaskGraphNode';
import { GAME_E2E_TYPES } from '../types/e2eTypes';

export function bindE2e(bind: interfaces.Bind): void {
  bind(GAME_E2E_TYPES.card.CREATE_VOID_LAND_TASK_GRAPH_NODE).to(
    CreateVoidLandTaskGraphNode,
  );
  bind(GAME_E2E_TYPES.deck.CREATE_CARD_DECK_OF_VOID_LAND_TASK_GRAPH_NODE).to(
    CreateCardDeckOfVoidLandGraphNode,
  );
}

export const gameTestE2eContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindE2e(bind);
  },
);
