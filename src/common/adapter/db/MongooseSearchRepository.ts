import { Document, FilterQuery, Model } from 'mongoose';
import { Port } from '../../port';
import { SearchRepository } from '../../domain';
import { injectable } from 'inversify';

@injectable()
export abstract class MongooseSearchRepository<TModel extends Document, TQuery>
  implements SearchRepository<TModel, TQuery> {
  constructor(
    protected model: Model<TModel>,
    protected readonly queryToFilterQueryPort: Port<
      TQuery,
      FilterQuery<TModel>
    >,
  ) {}

  public async find(query: TQuery): Promise<TModel[]> {
    return this.model.find(this.queryToFilterQueryPort.transform(query));
  }

  public async findOne(query: TQuery): Promise<TModel | null> {
    return this.model.findOne(this.queryToFilterQueryPort.transform(query));
  }
}
