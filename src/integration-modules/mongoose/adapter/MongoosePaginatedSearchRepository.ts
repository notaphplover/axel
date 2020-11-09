import { Converter, Filter } from '../../../common/domain';
import { Document, FilterQuery, Model } from 'mongoose';
import { MongooseProjectionPaginatedSearchRepository } from './MongooseProjectionPaginatedSearchRepository';
import { SearchRepository } from '../../../layer-modules/db/domain';
import { injectable } from 'inversify';

@injectable()
export abstract class MongoosePaginatedSearchRepository<
    TModel,
    TModelDb extends Document,
    TQuery
  >
  extends MongooseProjectionPaginatedSearchRepository<
    TModel,
    TModelDb,
    TModelDb,
    TQuery
  >
  implements SearchRepository<TModel, TQuery> {
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
  ) {
    super(
      model,
      modelDbToModelConverter,
      queryToFilterQueryConverter,
      null,
      postSearchFilter,
    );
  }
}
