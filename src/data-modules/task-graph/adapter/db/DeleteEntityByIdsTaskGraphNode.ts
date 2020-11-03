import { Document, Model, Types } from 'mongoose';
import { BaseTaskGraphNode } from '../../../../data-modules/task-graph/domain';

export class DeleteEntityByIdsTaskGraphNode<
  TId,
  TEntityId = Types.ObjectId
> extends BaseTaskGraphNode<TId, void> {
  constructor(
    id: TId,
    private readonly entityDbModel: Model<Document>,
    private readonly entityIds: TEntityId[],
  ) {
    super([], id);
  }

  protected async innerPerform(): Promise<void> {
    await this.entityDbModel.deleteMany({
      _id: {
        $in: this.entityIds,
      },
    });
  }
}
