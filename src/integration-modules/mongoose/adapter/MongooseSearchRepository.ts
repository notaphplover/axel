import { injectable } from 'inversify';
import { Document, FilterQuery, Model } from 'mongoose';

import { Converter, Filter } from '../../../common/domain';
import { SearchRepository } from '../../../layer-modules/db/domain';
import { MongooseProjectionSearchRepository } from './MongooseProjectionSearchRepository';


@injectable()
export abstract class MongooseSearchRepository<
    TModel,
    TModelDb extends Document,
    TQuery
  >
  extends MongooseProjectionSearchRepository<TModel, TModelDb, TModelDb, TQuery>
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
