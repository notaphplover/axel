import { inject, injectable } from 'inversify';
import { CreateEntityTaskGraphNode } from '../../../../task-graph/adapter';
import { GAME_ADAPTER_TYPES } from '../../../adapter/config/types';
import { GAME_E2E_TYPES } from '../../config/types/e2eTypes';
import { LandDb } from '../../../adapter/db/model/card/LandDb';
import { Model } from 'mongoose';
import { land } from '../../fixtures/domain/model/card';

@injectable()
export class CreateVoidLandDbTaskGraphNode extends CreateEntityTaskGraphNode<
  symbol,
  LandDb
> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.card.LAND_DB_MODEL)
    landDbModel: Model<LandDb>,
  ) {
    super(
      [],
      GAME_E2E_TYPES.card.CREATE_VOID_LAND_DB_TASK_GRAPH_NODE,
      landDbModel,
    );
  }

  protected buildDocumentBody(): unknown {
    const landDbDocumentBody: Partial<LandDb> = {
      cost: land.cost,
      detail: land.detail,
      type: land.type,
    };

    return landDbDocumentBody;
  }
}
