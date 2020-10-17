import { Converter, Filter } from '../../../common/domain';
import { Document, DocumentQuery, FilterQuery, Model } from 'mongoose';
import { SearchRepository } from '../domain/SearchRepository';
import { hasValue } from '../../../common/domain/utils/hasValue';
import { injectable } from 'inversify';

@injectable()
export abstract class MongooseProjectionSearchRepository<
  TModel,
  TModelDb extends Document,
  TOutputModelDb extends Document,
  TQuery
> implements SearchRepository<TModel, TQuery> {
  constructor(
    protected readonly model: Model<TModelDb>,
    protected readonly modelDbToModelConverter: Converter<
      TOutputModelDb,
      TModel | Promise<TModel>
    >,
    protected readonly queryToFilterQueryConverter: Converter<
      TQuery,
      FilterQuery<TModelDb> | Promise<FilterQuery<TModelDb>>
    >,
    protected readonly mongooseProjection: unknown = null,
    protected readonly postSearchFilter: Filter<
      TOutputModelDb,
      TQuery
    > | null = null,
  ) {}

  public async find(query: TQuery): Promise<TModel[]> {
    const documentQuery: Promise<TModelDb[]> = this.buildQuery(
      query,
      this.model.find.bind(this.model),
    );

    let entitiesDbFound: TOutputModelDb[] = ((await documentQuery) as Document[]) as TOutputModelDb[];

    if (this.postSearchFilter !== null) {
      entitiesDbFound = await this.postSearchFilter.filter(
        entitiesDbFound,
        query,
      );
    }

    const entities: TModel[] = await Promise.all(
      entitiesDbFound.map((entityDb: TOutputModelDb) =>
        this.modelDbToModelConverter.transform(entityDb),
      ),
    );

    return entities;
  }

  public async findOne(query: TQuery): Promise<TModel | null> {
    const documentQuery: Promise<TModelDb | null> = this.buildQuery(
      query,
      this.model.findOne.bind(this.model),
    );

    let entityDbFound: TOutputModelDb | null = ((await documentQuery) as Document | null) as TOutputModelDb | null;

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

  private async buildQuery<TMongooseQueryOutput>(
    query: TQuery,
    documentQueryGenerator: (
      filterQuery: FilterQuery<TModelDb>,
    ) => DocumentQuery<TMongooseQueryOutput, TModelDb>,
  ): Promise<TMongooseQueryOutput> {
    const mongooseQuery: FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );

    let documentQuery: DocumentQuery<
      TMongooseQueryOutput,
      TModelDb
    > = documentQueryGenerator(mongooseQuery);

    if (hasValue(this.mongooseProjection)) {
      documentQuery = documentQuery.select(this.mongooseProjection);
    }

    return documentQuery;
  }
}
