import { Document, FilterQuery, Model } from 'mongoose';
import { Port } from '../../port';
import { SearchRepository } from '../../domain';
import { injectable } from 'inversify';

@injectable()
export abstract class MongooseSearchRepository<
  TModel,
  TModelDb extends Document,
  TQuery
> implements SearchRepository<TModel, TQuery> {
  constructor(
    protected model: Model<TModelDb>,
    protected modelDbToModelPort: Port<TModelDb, TModel>,
    protected readonly queryToFilterQueryPort: Port<
      TQuery,
      FilterQuery<TModelDb>
    >,
  ) {}

  public async find(query: TQuery): Promise<TModel[]> {
    const entitiesDbFound: TModelDb[] = await this.model.find(
      this.queryToFilterQueryPort.transform(query),
    );
    const entities: TModel[] = entitiesDbFound.map(
      this.modelDbToModelPort.transform.bind(this),
    );

    return entities;
  }

  public async findOne(query: TQuery): Promise<TModel | null> {
    const entityDbFound: TModelDb | null = await this.model.findOne(
      this.queryToFilterQueryPort.transform(query),
    );

    const entity: TModel | null =
      entityDbFound === null
        ? null
        : this.modelDbToModelPort.transform(entityDbFound);

    return entity;
  }
}
