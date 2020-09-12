import { Document, FilterQuery, Model } from 'mongoose';
import { Converter } from '../../../common/domain';
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
  ) {}

  public async find(query: TQuery): Promise<TModel[]> {
    const entitiesDbFound: TModelDb[] = await this.model.find(
      await this.queryToFilterQueryConverter.transform(query),
    );
    const entities: TModel[] = await Promise.all(
      entitiesDbFound.map((entityDb: TModelDb) =>
        this.modelDbToModelConverter.transform(entityDb),
      ),
    );

    return entities;
  }

  public async findOne(query: TQuery): Promise<TModel | null> {
    const entityDbFound: TModelDb | null = await this.model.findOne(
      await this.queryToFilterQueryConverter.transform(query),
    );

    const entity: TModel | null =
      entityDbFound === null
        ? null
        : await this.modelDbToModelConverter.transform(entityDbFound);

    return entity;
  }
}
