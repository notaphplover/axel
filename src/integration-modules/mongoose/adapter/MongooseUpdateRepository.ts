import {
  Document,
  FilterQuery,
  Model,
  ModelUpdateOptions,
  Query,
  UpdateQuery,
} from 'mongoose';
import { Converter } from '../../../common/domain';
import { UpdateRepository } from '../../../layer-modules/db/domain';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

@injectable()
export abstract class MongooseUpdateRepository<
  TModel,
  TQuery,
  TModelDb extends Document
> implements UpdateRepository<TModel, TQuery> {
  constructor(
    protected readonly model: Model<TModelDb>,
    protected readonly modelDbToModelConverter: Converter<
      TModelDb,
      TModel | Promise<TModel>
    >,
    protected readonly queryToFilterQueryConverter: Converter<
      TQuery,
      FilterQuery<TModelDb> | Promise<FilterQuery<TModelDb>>
    >,
    protected readonly queryToUpdateQueryConverter: Converter<
      TQuery,
      UpdateQuery<TModelDb> | Promise<UpdateQuery<TModelDb>>
    >,
  ) {}

  public async update(query: TQuery): Promise<void> {
    await this.innerUpdate(query, this.model.updateMany.bind(this.model));
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

    const filterQuery: FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );
    const updateQuery: UpdateQuery<TModelDb> = await this.queryToUpdateQueryConverter.transform(
      query,
    );

    const entitiesDbToBeUpdated: TModelDb[] = await this.model.find(
      filterQuery,
    );

    const entitiesDbToBeUpdatedIds: unknown[] = entitiesDbToBeUpdated.map(
      (entityToBeUpdated: TModelDb) => entityToBeUpdated._id as unknown,
    );

    const filterEntitiesByIdsQuery: mongodb.FilterQuery<TModelDb> = {
      _id: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $in: entitiesDbToBeUpdatedIds as any[],
      },
    };

    await this.model.updateMany(
      filterEntitiesByIdsQuery as FilterQuery<TModelDb>,
      updateQuery,
    );

    const entitiesDbUpdated: TModelDb[] = await this.model.find(
      filterEntitiesByIdsQuery as FilterQuery<TModelDb>,
    );

    const entitiesUpdated: TModel[] = await Promise.all(
      entitiesDbUpdated.map((entityDbUpdated: TModelDb) =>
        this.modelDbToModelConverter.transform(entityDbUpdated),
      ),
    );

    return entitiesUpdated;
  }

  public async updateOne(query: TQuery): Promise<void> {
    await this.innerUpdate(query, this.model.updateOne.bind(this.model));
  }

  public async updateOneAndSelect(query: TQuery): Promise<TModel | null> {
    const filterQuery: FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );
    const updateQuery: UpdateQuery<TModelDb> = await this.queryToUpdateQueryConverter.transform(
      query,
    );

    const entityDbUpdated: TModelDb | null = await this.model.findOneAndUpdate(
      filterQuery,
      updateQuery,
      { new: true },
    );

    const entityUpdated: TModel | null =
      entityDbUpdated === null
        ? null
        : await this.modelDbToModelConverter.transform(entityDbUpdated);

    return entityUpdated;
  }

  private async innerUpdate(
    query: TQuery,
    updateFn: (
      conditions: FilterQuery<TModelDb>,
      doc: UpdateQuery<TModelDb>,
      options: ModelUpdateOptions,
    ) => Query<unknown, TModelDb>,
  ): Promise<void> {
    const filterQuery: FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );
    const updateQuery: UpdateQuery<TModelDb> = await this.queryToUpdateQueryConverter.transform(
      query,
    );

    await updateFn(filterQuery, updateQuery, {});
  }
}
