// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_E2E_TYPES = {
  card: {
    CREATE_CREATURE_TASK_GRAPH_NODE: Symbol('CreateVoidLandTaskGraphNode'),
  },
  deck: {
    CREATE_CARD_DECK_OF_CREATURE_TASK_GRAPH_NODE: Symbol(
      'CreateCardDeckOfVoidLandGraphNode',
    ),
  },
  setup: {
    CREATE_GAME_SETUP_OF_ONE_PLAYER_GRAPH_NODE: Symbol(
      'CreateGameSetupOfOnePlayerGraphNode',
    ),
  },
};
