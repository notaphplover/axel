import { Converter, Filter } from '../../../common/domain';
import { injectable, unmanaged } from 'inversify';
import { MongoDbConnector } from './MongoDbConnector';
import { SearchRepository } from '../../../layer-modules/db/domain';
import mongodb from 'mongodb';

@injectable()
export abstract class MongoDbSearchRepository<
  TModel,
  TModelDb,
  TOutputModelDb,
  TQuery
> implements SearchRepository<TModel, TQuery> {
  private innerCollection: mongodb.Collection<TModelDb> | undefined;

  constructor(
    @unmanaged()
    protected readonly collectionName: string,
    @unmanaged()
    protected readonly modelDbToModelConverter: Converter<
      TOutputModelDb,
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
    protected readonly postSearchFilter: Filter<
      TOutputModelDb,
      TQuery
    > | null = null,
  ) {}

  private get collection(): mongodb.Collection<TModelDb> {
    if (this.innerCollection === undefined) {
      this.innerCollection = this.mongoDbConnector.db.collection<TModelDb>(
        this.collectionName,
      );
    }

    return this.innerCollection;
  }

  public async find(query: TQuery): Promise<TModel[]> {
    const mongoDbQuery: mongodb.FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );

    let entitiesDbFound: TOutputModelDb[] = await this.buildFindCursor(
      query,
      mongoDbQuery,
    ).toArray();

    if (this.postSearchFilter !== null) {
      entitiesDbFound = await this.postSearchFilter.filter(
        entitiesDbFound,
        query,
      );
    }

    const entities: TModel[] = await Promise.all(
      entitiesDbFound.map((entityDb: TOutputModelDb) =>
        this.modelDbToModelConverter.transform(entityDb),
      ),
    );

    return entities;
  }

  public async findOne(query: TQuery): Promise<TModel | null> {
    const mongoDbQuery: mongodb.FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );

    let entityDbFound: TOutputModelDb | null = await this.collection.findOne<TOutputModelDb>(
      mongoDbQuery,
      this.getFindOptions(),
    );
    if (entityDbFound !== null && this.postSearchFilter !== null) {
      entityDbFound = await this.postSearchFilter.filterOne(
        entityDbFound,
        query,
      );
    }

    const entity: TModel | null =
      entityDbFound === null
        ? null
        : await this.modelDbToModelConverter.transform(entityDbFound);

    return entity;
  }

  protected buildFindCursor(
    query: TQuery,
    mongoDbQuery: mongodb.FilterQuery<TModelDb>,
  ): mongodb.Cursor<TOutputModelDb> {
    return this.collection.find<TOutputModelDb>(
      mongoDbQuery,
      this.getFindOptions(),
    );
  }

  protected getFindOptions(): mongodb.FindOneOptions<
    TOutputModelDb extends TModelDb ? TModelDb : TOutputModelDb
  > {
    return {};
  }
}
