import { inject, injectable } from 'inversify';

import { commonDomain, Interactor } from '../../../../../common/domain';
import { BaseTaskGraphNode } from '../../../../task-graph/domain';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { Card } from '../../../domain/model/card/Card';
import { CardCreationQuery } from '../../../domain/query/card/CardCreationQuery';
import { GAME_E2E_TYPES } from '../../config/types/e2eTypes';
import { cardCreationQuery } from '../../fixtures/domain/query/card';

@injectable()
export class CreateCreatureTaskGraphNode extends BaseTaskGraphNode<
  symbol,
  Card
> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.card.CREATE_CARDS_INTERACTOR)
    private readonly createCardsInteractor: Interactor<
      CardCreationQuery,
      Promise<Card[]>
    >,
  ) {
    super([], GAME_E2E_TYPES.card.CREATE_CREATURE_TASK_GRAPH_NODE);
  }

  protected async innerPerform(): Promise<Card> {
    const creaturesCreated: Card[] = await this.createCardsInteractor.interact({
      cost: cardCreationQuery.cost,
      detail: cardCreationQuery.detail,
      power: cardCreationQuery.power,
      toughness: cardCreationQuery.toughness,
      types: [...cardCreationQuery.types],
    });

    if (commonDomain.utils.hasOneElement(creaturesCreated)) {
      const [creatureCreated]: [Card] = creaturesCreated;

      return creatureCreated;
    } else {
      throw new Error('Expected one entity to be created');
    }
  }
}
