import { injectable, unmanaged } from 'inversify';
import mongodb from 'mongodb';

import { MongoDbConnector } from '.';
import { Converter } from '../../../common/domain';
import { DeleteRepository } from '../../../layer-modules/db/domain';
import { Document } from './model/Document';

@injectable()
export abstract class MongoDbDeleteRepository<TQuery, TModelDb extends Document>
  implements DeleteRepository<TQuery> {
  private innerCollection: mongodb.Collection<TModelDb> | undefined;

  constructor(
    @unmanaged()
    protected readonly collectionName: string,
    @unmanaged()
    protected readonly mongoDbConnector: MongoDbConnector,
    @unmanaged()
    protected readonly queryToFilterQueryConverter: Converter<
      TQuery,
      mongodb.FilterQuery<TModelDb> | Promise<mongodb.FilterQuery<TModelDb>>
    >,
  ) {}

  private get collection(): mongodb.Collection<TModelDb> {
    if (this.innerCollection === undefined) {
      this.innerCollection = this.mongoDbConnector.db.collection<TModelDb>(
        this.collectionName,
      );
    }

    return this.innerCollection;
  }

  public async delete(query: TQuery): Promise<void> {
    const filterQuery: mongodb.FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );

    await this.collection.deleteMany(filterQuery);
  }
}
