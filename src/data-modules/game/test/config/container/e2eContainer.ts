import { ContainerModule, interfaces } from 'inversify';

import { CreateCreatureTaskGraphNode } from '../../task-graph/card/CreateCreatureTaskGraphNode';
import { CreateCardDeckOfCreatureGraphNode } from '../../task-graph/deck/CreateCardDeckOfCreatureGraphNode';
import { CreateGameSetupOfOnePlayerGraphNode } from '../../task-graph/setup/CreateGameSetupOfOnePlayerGraphNode';
import { GAME_E2E_TYPES } from '../types/e2eTypes';

export function bindE2e(bind: interfaces.Bind): void {
  bind(GAME_E2E_TYPES.card.CREATE_CREATURE_TASK_GRAPH_NODE).to(
    CreateCreatureTaskGraphNode,
  );
  bind(GAME_E2E_TYPES.deck.CREATE_CARD_DECK_OF_CREATURE_TASK_GRAPH_NODE).to(
    CreateCardDeckOfCreatureGraphNode,
  );

  bind(GAME_E2E_TYPES.setup.CREATE_GAME_SETUP_OF_ONE_PLAYER_GRAPH_NODE).to(
    CreateGameSetupOfOnePlayerGraphNode,
  );
}

export const gameTestE2eContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindE2e(bind);
  },
);
