import { Document, Model } from 'mongoose';
import { injectable, unmanaged } from 'inversify';
import { BaseTaskGraphNode } from '../../domain';

@injectable()
export abstract class CreateEntityTaskGraphNode<
  TId,
  TEntity extends Document
> extends BaseTaskGraphNode<TId, TEntity> {
  constructor(
    @unmanaged()
    dependsOn: Iterable<TId>,
    @unmanaged()
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
