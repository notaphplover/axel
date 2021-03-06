import mongodb from 'mongodb';

import { PaginationQuery, commonDomain } from '../../../common/domain';
import { MongoDbSearchRepository } from './MongoDbSearchRepository';

const hasValue: <TType>(
  value: TType,
) => value is Exclude<TType, null | undefined> = commonDomain.utils.hasValue;

export abstract class MongoDbPaginatedSearchRepository<
  TModel,
  TModelDb,
  TOutputModelDb,
  TQuery extends PaginationQuery,
> extends MongoDbSearchRepository<TModel, TModelDb, TOutputModelDb, TQuery> {
  protected buildFindCursor(
    query: TQuery,
    mongoDbQuery: mongodb.FilterQuery<TModelDb>,
  ): mongodb.Cursor<TOutputModelDb> {
    let findCursor: mongodb.Cursor<TOutputModelDb> = super.buildFindCursor(
      query,
      mongoDbQuery,
    );

    if (hasValue(query.limit)) {
      findCursor = findCursor.limit(query.limit);
    }

    if (hasValue(query.offset)) {
      findCursor = findCursor.skip(query.offset);
    }

    return findCursor;
  }
}
