import { inject, injectable } from 'inversify';

import { commonDomain, Interactor } from '../../../../../common/domain';
import { commonTest } from '../../../../../common/test';
import {
  BaseTaskGraphNode,
  TaskGraph,
  TaskGraphNode,
} from '../../../../task-graph/domain';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { Card } from '../../../domain/model/card/Card';
import { CardDeck } from '../../../domain/model/deck/CardDeck';
import { GameFormat } from '../../../domain/model/GameFormat';
import { CardDeckCreationQuery } from '../../../domain/query/deck/CardDeckCreationQuery';
import { GAME_E2E_TYPES } from '../../config/types/e2eTypes';

@injectable()
export class CreateCardDeckOfCreatureGraphNode extends BaseTaskGraphNode<
  symbol,
  CardDeck
> {
  constructor(
    @inject(commonTest.config.types.taskGraph.CURRENT_TASK_GRAPH)
    private readonly currentTaskGraph: TaskGraph<symbol>,
    @inject(GAME_DOMAIN_TYPES.interactor.deck.CREATE_CARD_DECKS_INTERACTOR)
    private readonly createCardDecksInteractor: Interactor<
      CardDeckCreationQuery,
      Promise<CardDeck[]>
    >,
  ) {
    super(
      [GAME_E2E_TYPES.card.CREATE_CREATURE_TASK_GRAPH_NODE],
      GAME_E2E_TYPES.deck.CREATE_CARD_DECK_OF_CREATURE_TASK_GRAPH_NODE,
    );
  }

  protected async innerPerform(): Promise<CardDeck> {
    const createCreatureTaskGraphNode: TaskGraphNode<
      symbol,
      Card
    > = this.currentTaskGraph.getNode(
      GAME_E2E_TYPES.card.CREATE_CREATURE_TASK_GRAPH_NODE,
    ) as TaskGraphNode<symbol, Card>;

    const creature: Card = createCreatureTaskGraphNode.getOutput();

    const cardDeckCreationQuery: CardDeckCreationQuery = {
      description: 'sample-description',
      format: GameFormat.UNRESTRICTED,
      name: 'sample-name',
      sections: {
        core: {
          references: [creature.id],
        },
        sideboard: {
          references: [creature.id],
        },
      },
    };

    const cardDecksOfCreatureLand: CardDeck[] = await this.createCardDecksInteractor.interact(
      cardDeckCreationQuery,
    );

    if (commonDomain.utils.hasOneElement(cardDecksOfCreatureLand)) {
      const [cardDeckOfCreatureLand]: [CardDeck] = cardDecksOfCreatureLand;

      return cardDeckOfCreatureLand;
    } else {
      throw new Error('Expected one entity to be created');
    }
  }
}
