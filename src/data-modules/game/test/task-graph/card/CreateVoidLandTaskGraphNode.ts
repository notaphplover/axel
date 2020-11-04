import { inject, injectable } from 'inversify';
import { BaseTaskGraphNode } from '../../../../task-graph/domain';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { GAME_E2E_TYPES } from '../../config/types/e2eTypes';
import { Interactor } from '../../../../../common/domain';
import { Land } from '../../../domain/model/card/Land';
import { LandCreationQuery } from '../../../domain/query/card/LandCreationQuery';
import { landCreationQuery } from '../../fixtures/domain/query/card';

@injectable()
export class CreateVoidLandTaskGraphNode extends BaseTaskGraphNode<
  symbol,
  Land
> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.card.CREATE_LANDS_INTERACTOR)
    private readonly createLandsInteractor: Interactor<
      LandCreationQuery,
      Promise<Land[]>
    >,
  ) {
    super([], GAME_E2E_TYPES.card.CREATE_VOID_LAND_TASK_GRAPH_NODE);
  }

  protected async innerPerform(): Promise<Land> {
    const [landCreated]: Land[] = await this.createLandsInteractor.interact({
      cost: landCreationQuery.cost,
      detail: landCreationQuery.detail,
      type: landCreationQuery.type,
    });

    return landCreated;
  }
}
