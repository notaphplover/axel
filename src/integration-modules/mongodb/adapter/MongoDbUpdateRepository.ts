import { Converter, commonDomain } from '../../../common/domain';
import { injectable, unmanaged } from 'inversify';
import { Document } from './model/Document';
import { MongoDbConnector } from '.';
import { UpdateRepository } from '../../../layer-modules/db/domain/UpdateRepository';
import mongodb from 'mongodb';

const hasValue: <TType>(
  value: TType,
) => value is Exclude<TType, null | undefined> = commonDomain.utils.hasValue;

@injectable()
export abstract class MongoDbUpdateRepository<
  TModel,
  TQuery,
  TModelDb extends Document
> implements UpdateRepository<TModel, TQuery> {
  private innerCollection: mongodb.Collection<TModelDb> | undefined;

  constructor(
    @unmanaged()
    protected readonly collectionName: string,
    @unmanaged()
    protected readonly modelDbToModelConverter: Converter<
      TModelDb,
      TModel | Promise<TModel>
    >,
    @unmanaged()
    protected readonly mongoDbConnector: MongoDbConnector,
    @unmanaged()
    protected readonly queryToFilterQueryConverter: Converter<
      TQuery,
      mongodb.FilterQuery<TModelDb> | Promise<mongodb.FilterQuery<TModelDb>>
    >,
    @unmanaged()
    protected readonly queryToUpdateQueryConverter: Converter<
      TQuery,
      mongodb.UpdateQuery<TModelDb> | Promise<mongodb.UpdateQuery<TModelDb>>
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

  public async update(query: TQuery): Promise<void> {
    const filterQuery: mongodb.FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );
    const updateQuery: mongodb.UpdateQuery<TModelDb> = await this.queryToUpdateQueryConverter.transform(
      query,
    );

    await this.collection.updateMany(filterQuery, updateQuery);
  }

  public async updateAndSelect(query: TQuery): Promise<TModel[]> {
    /*
     * Mongo DB won't allow us to perform an atomic multiple update operation.
     *
     * Transactions comes with a performance cost, needs a replica set and doesn't seem to be mature enough.
     *
     * So, the following algorithm is performed:
     *
     * 1. Filter entities to be updated.
     * 2. Get ids of the entities to be updated.
     * 3. Perform the update.
     * 4. Find entities by ids.
     * 5. Return entities updated.
     */

    const filterQuery: mongodb.FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );
    const updateQuery: mongodb.UpdateQuery<TModelDb> = await this.queryToUpdateQueryConverter.transform(
      query,
    );

    const entitiesDbToBeUpdated: TModelDb[] = await this.collection
      .find<TModelDb>(filterQuery)
      .toArray();

    const entitiesDbToBeUpdatedIds: mongodb.ObjectID[] = entitiesDbToBeUpdated.map(
      (entityToBeUpdated: TModelDb) => entityToBeUpdated._id,
    );

    const filterEntitiesByIdsQuery: mongodb.FilterQuery<TModelDb> = {
      _id: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $in: entitiesDbToBeUpdatedIds as any[],
      },
    };

    await this.collection.updateMany(filterEntitiesByIdsQuery, updateQuery);

    const entitiesDbUpdated: TModelDb[] = await this.collection
      .find(filterEntitiesByIdsQuery)
      .toArray();

    const entitiesUpdated: TModel[] = await Promise.all(
      entitiesDbUpdated.map((entityDbUpdated: TModelDb) =>
        this.modelDbToModelConverter.transform(entityDbUpdated),
      ),
    );

    return entitiesUpdated;
  }

  public async updateOne(query: TQuery): Promise<void> {
    const filterQuery: mongodb.FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );
    const updateQuery: mongodb.UpdateQuery<TModelDb> = await this.queryToUpdateQueryConverter.transform(
      query,
    );

    await this.collection.updateOne(filterQuery, updateQuery);
  }

  public async updateOneAndSelect(query: TQuery): Promise<TModel | null> {
    const filterQuery: mongodb.FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );
    const updateQuery: mongodb.UpdateQuery<TModelDb> = await this.queryToUpdateQueryConverter.transform(
      query,
    );

    const entityDbUpdatedResult: mongodb.FindAndModifyWriteOpResultObject<TModelDb> = await this.collection.findOneAndUpdate(
      filterQuery,
      updateQuery,
      {
        returnOriginal: false,
      },
    );

    const entityUpdated: TModel | null =
      entityDbUpdatedResult.ok === 1 && hasValue(entityDbUpdatedResult.value)
        ? await this.modelDbToModelConverter.transform(
            entityDbUpdatedResult.value,
          )
        : null;

    return entityUpdated;
  }
}
