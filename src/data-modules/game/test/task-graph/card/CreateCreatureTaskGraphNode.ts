import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../common/domain';
import { BaseTaskGraphNode } from '../../../../task-graph/domain';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { Creature } from '../../../domain/model/card/Creature';
import { CreatureCreationQuery } from '../../../domain/query/card/CreatureCreationQuery';
import { GAME_E2E_TYPES } from '../../config/types/e2eTypes';
import { creatureCreationQuery } from '../../fixtures/domain/query/card';

@injectable()
export class CreateCreatureTaskGraphNode extends BaseTaskGraphNode<
  symbol,
  Creature
> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.card.CREATE_CREATURES_INTERACTOR)
    private readonly createCreaturesInteractor: Interactor<
      CreatureCreationQuery,
      Promise<Creature[]>
    >,
  ) {
    super([], GAME_E2E_TYPES.card.CREATE_CREATURE_TASK_GRAPH_NODE);
  }

  protected async innerPerform(): Promise<Creature> {
    const [
      creatureCreated,
    ]: Creature[] = await this.createCreaturesInteractor.interact({
      cost: creatureCreationQuery.cost,
      detail: creatureCreationQuery.detail,
      power: creatureCreationQuery.power,
      toughness: creatureCreationQuery.toughness,
      type: creatureCreationQuery.type,
    });

    return creatureCreated;
  }
}
