import { inject, injectable } from 'inversify';

import { Capsule, Interactor } from '../../../../../common/domain';
import { commonTest } from '../../../../../common/test';
import {
  BaseTaskGraphNode,
  TaskGraph,
  TaskGraphNode,
} from '../../../../task-graph/domain';
import { User } from '../../../../user/domain';
import { USER_E2E_TYPES } from '../../../../user/test/config/types/e2eTypes';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { CardDeck } from '../../../domain/model/deck/CardDeck';
import { GameSetup } from '../../../domain/model/setup/GameSetup';
import { GameSetupsCreationQuery } from '../../../domain/query/setup/GameSetupCreationQuery';
import { GAME_E2E_TYPES } from '../../config/types/e2eTypes';

@injectable()
export class CreateGameSetupOfOnePlayerGraphNode extends BaseTaskGraphNode<
  symbol,
  GameSetup
> {
  constructor(
    @inject(commonTest.config.types.taskGraph.CURRENT_TASK_GRAPH)
    private readonly currentTaskGraph: TaskGraph<symbol>,
    @inject(GAME_DOMAIN_TYPES.interactor.setup.CREATE_GAME_SETUPS_INTERACTOR)
    private readonly createGameSetupsInteractor: Interactor<
      GameSetupsCreationQuery,
      Promise<GameSetup[]>
    >,
  ) {
    super(
      [
        USER_E2E_TYPES.CREATE_FIRST_USER_TASK_GRAPH_NODE,
        GAME_E2E_TYPES.deck.CREATE_CARD_DECK_OF_VOID_LAND_TASK_GRAPH_NODE,
      ],
      GAME_E2E_TYPES.setup.CREATE_GAME_SETUP_OF_ONE_PLAYER_GRAPH_NODE,
    );
  }

  protected async innerPerform(): Promise<GameSetup> {
    const createCardDeckOfVoidLandGraphNode: TaskGraphNode<
      symbol,
      CardDeck
    > = this.currentTaskGraph.getNode(
      GAME_E2E_TYPES.deck.CREATE_CARD_DECK_OF_VOID_LAND_TASK_GRAPH_NODE,
    ) as TaskGraphNode<symbol, CardDeck>;

    const createFirstUserGraphNode: TaskGraphNode<
      symbol,
      User
    > = this.currentTaskGraph.getNode(
      USER_E2E_TYPES.CREATE_FIRST_USER_TASK_GRAPH_NODE,
    ) as TaskGraphNode<symbol, User>;

    const cardDeck: CardDeck = (createCardDeckOfVoidLandGraphNode.getOutput() as Capsule<CardDeck>)
      .elem;

    const user: User = (createFirstUserGraphNode.getOutput() as Capsule<User>)
      .elem;

    const gameSetupCreationQuery: GameSetupsCreationQuery = {
      format: cardDeck.format,
      ownerUserId: user.id,
      playerSetups: [
        {
          deckId: cardDeck.id,
          userId: user.id,
        },
      ],
      playerSlots: 1,
    };

    const [
      gameSetup,
    ]: GameSetup[] = await this.createGameSetupsInteractor.interact(
      gameSetupCreationQuery,
    );

    return gameSetup;
  }
}
