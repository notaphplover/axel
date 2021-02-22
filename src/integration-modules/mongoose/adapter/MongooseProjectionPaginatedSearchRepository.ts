import { injectable } from 'inversify';
import { Document, Query } from 'mongoose';

import { Capsule, PaginationQuery, commonDomain } from '../../../common/domain';
import { SearchRepository } from '../../../layer-modules/db/domain';
import { MongooseProjectionSearchRepository } from './MongooseProjectionSearchRepository';


@injectable()
export abstract class MongooseProjectionPaginatedSearchRepository<
    TModel,
    TModelDb extends Document,
    TOutputModelDb extends Document,
    TQuery extends PaginationQuery
  >
  extends MongooseProjectionSearchRepository<
    TModel,
    TModelDb,
    TOutputModelDb,
    TQuery
  >
  implements SearchRepository<TModel, TQuery> {
  protected async buildFindDocumentQuery(
    query: TQuery,
  ): Promise<Capsule<Query<TModelDb[], TModelDb>>> {
    const documentQueryCapsule: Capsule<
      Query<TModelDb[], TModelDb>
    > = await super.buildFindDocumentQuery(query);

    if (commonDomain.utils.hasValue(query.limit)) {
      documentQueryCapsule.elem = documentQueryCapsule.elem.limit(query.limit);
    }

    if (commonDomain.utils.hasValue(query.offset)) {
      documentQueryCapsule.elem = documentQueryCapsule.elem.skip(query.offset);
    }

    return documentQueryCapsule;
  }
}
