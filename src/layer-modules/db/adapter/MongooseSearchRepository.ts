import { Converter, Filter } from '../../../common/domain';
import { Document, FilterQuery, Model } from 'mongoose';
import { SearchRepository } from '../domain/SearchRepository';
import { injectable } from 'inversify';

@injectable()
export abstract class MongooseSearchRepository<
  TModel,
  TModelDb extends Document,
  TQuery
> implements SearchRepository<TModel, TQuery> {
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
    protected readonly postSearchFilter: Filter<TModelDb, TQuery> | null = null,
  ) {}

  public async find(query: TQuery): Promise<TModel[]> {
    const mongooseQuery: FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );

    let entitiesDbFound: TModelDb[] = await this.model.find(mongooseQuery);

    if (this.postSearchFilter !== null) {
      entitiesDbFound = await this.postSearchFilter.filter(
        entitiesDbFound,
        query,
      );
    }

    const entities: TModel[] = await Promise.all(
      entitiesDbFound.map((entityDb: TModelDb) =>
        this.modelDbToModelConverter.transform(entityDb),
      ),
    );

    return entities;
  }

  public async findOne(query: TQuery): Promise<TModel | null> {
    const mongooseQuery: FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );

    let entityDbFound: TModelDb | null = await this.model.findOne(
      mongooseQuery,
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
}
