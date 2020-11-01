import { Document, Model } from 'mongoose';
import { BaseTaskGraphNode } from '../../../../data-modules/task-graph/domain';

export abstract class CreateEntityTaskGraphNode<
  TId,
  TEntity extends Document
> extends BaseTaskGraphNode<TId, TEntity> {
  constructor(
    dependsOn: Iterable<TId>,
    id: TId,
    private readonly entityDbModel: Model<TEntity>,
  ) {
    super(dependsOn, id);
  }

  protected async innerPerform(): Promise<TEntity> {
    const entity: TEntity = new this.entityDbModel(this.buildDocumentBody());

    const entityFromDb: TEntity = await entity.save();

    return entityFromDb;
  }

  protected abstract buildDocumentBody(): unknown;
}
