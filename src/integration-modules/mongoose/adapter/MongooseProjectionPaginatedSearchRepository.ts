import { Capsule, PaginationQuery } from '../../../common/domain';
import { Document, DocumentQuery } from 'mongoose';
import { MongooseProjectionSearchRepository } from './MongooseProjectionSearchRepository';
import { SearchRepository } from '../../../layer-modules/db/domain';
import { hasValue } from '../../../common/domain/utils/hasValue';
import { injectable } from 'inversify';

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
  ): Promise<Capsule<DocumentQuery<TModelDb[], TModelDb>>> {
    const documentQueryCapsule: Capsule<
      DocumentQuery<TModelDb[], TModelDb>
    > = await super.buildFindDocumentQuery(query);

    if (hasValue(query.limit)) {
      documentQueryCapsule.elem = documentQueryCapsule.elem.limit(query.limit);
    }

    if (hasValue(query.offset)) {
      documentQueryCapsule.elem = documentQueryCapsule.elem.skip(query.offset);
    }

    return documentQueryCapsule;
  }
}
