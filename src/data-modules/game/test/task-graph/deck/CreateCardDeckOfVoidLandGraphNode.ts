import {
  BaseTaskGraphNode,
  TaskGraph,
  TaskGraphNode,
} from '../../../../task-graph/domain';
import { Capsule, Interactor } from '../../../../../common/domain';
import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../domain/model/deck/CardDeck';
import { CardDeckCreationQuery } from '../../../domain/query/deck/CardDeckCreationQuery';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { GAME_E2E_TYPES } from '../../config/types/e2eTypes';
import { GameFormat } from '../../../domain/model/GameFormat';
import { Land } from '../../../domain/model/card/Land';
import { commonTest } from '../../../../../common/test';

@injectable()
export class CreateCardDeckOfVoidLandGraphNode extends BaseTaskGraphNode<
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
      [GAME_E2E_TYPES.card.CREATE_VOID_LAND_TASK_GRAPH_NODE],
      GAME_E2E_TYPES.deck.CREATE_CARD_DECK_OF_VOID_LAND_TASK_GRAPH_NODE,
    );
  }

  protected async innerPerform(): Promise<CardDeck> {
    const createVoidLandTaskGraphNode: TaskGraphNode<
      symbol,
      Land
    > = this.currentTaskGraph.getNode(
      GAME_E2E_TYPES.card.CREATE_VOID_LAND_TASK_GRAPH_NODE,
    ) as TaskGraphNode<symbol, Land>;

    const voidLand: Land = (createVoidLandTaskGraphNode.getOutput() as Capsule<Land>)
      .elem;

    const cardDeckCreationQuery: CardDeckCreationQuery = {
      description: 'sample-description',
      format: GameFormat.UNRESTRICTED,
      name: 'sample-name',
      sections: {
        core: {
          references: [voidLand.id],
        },
        sideboard: {
          references: [voidLand.id],
        },
      },
    };

    const [
      cardDeckOfVoidLand,
    ]: CardDeck[] = await this.createCardDecksInteractor.interact(
      cardDeckCreationQuery,
    );

    return cardDeckOfVoidLand;
  }
}
