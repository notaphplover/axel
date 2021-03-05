import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../common/domain';
import { BaseTaskGraphNode } from '../../../../task-graph/domain';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { Card } from '../../../domain/model/card/Card';
import { Creature } from '../../../domain/model/card/Creature';
import { CardCreationQuery } from '../../../domain/query/card/CardCreationQuery';
import { GAME_E2E_TYPES } from '../../config/types/e2eTypes';
import { creatureCreationQuery } from '../../fixtures/domain/query/card';

@injectable()
export class CreateCreatureTaskGraphNode extends BaseTaskGraphNode<
  symbol,
  Creature
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
    const [creatureCreated]: Card[] = await this.createCardsInteractor.interact(
      {
        cost: creatureCreationQuery.cost,
        detail: creatureCreationQuery.detail,
        power: creatureCreationQuery.power,
        toughness: creatureCreationQuery.toughness,
        type: creatureCreationQuery.type,
      },
    );

    return creatureCreated;
  }
}
