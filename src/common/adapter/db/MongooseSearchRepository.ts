import { Document, FilterQuery, Model } from 'mongoose';
import { Converter } from '../../domain';
import { SearchRepository } from '../../domain';
import { injectable } from 'inversify';

@injectable()
export abstract class MongooseSearchRepository<
  TModel,
  TModelDb extends Document,
  TQuery
> implements SearchRepository<TModel, TQuery> {
  constructor(
    protected readonly model: Model<TModelDb>,
    protected readonly modelDbToModelConverter: Converter<TModelDb, TModel>,
    protected readonly queryToFilterQueryConverter: Converter<
      TQuery,
      FilterQuery<TModelDb>
    >,
  ) {}

  public async find(query: TQuery): Promise<TModel[]> {
    const entitiesDbFound: TModelDb[] = await this.model.find(
      this.queryToFilterQueryConverter.transform(query),
    );
    const entities: TModel[] = entitiesDbFound.map(
      this.modelDbToModelConverter.transform.bind(this),
    );

    return entities;
  }

  public async findOne(query: TQuery): Promise<TModel | null> {
    const entityDbFound: TModelDb | null = await this.model.findOne(
      this.queryToFilterQueryConverter.transform(query),
    );

    const entity: TModel | null =
      entityDbFound === null
        ? null
        : this.modelDbToModelConverter.transform(entityDbFound);

    return entity;
  }
}
