import mongoose, {
  ClientSession,
  Document,
  DocumentQuery,
  FilterQuery,
  Model,
  ModelUpdateOptions,
  Query,
  UpdateQuery,
} from 'mongoose';
import { Converter } from '../../../common/domain';
import { UpdateRepository } from '../../../layer-modules/db/domain/UpdateRepository';
import { injectable } from 'inversify';

@injectable()
export abstract class MongooseUpdateRepository<
  TModel,
  TQuery,
  TModelDb extends Document
> implements UpdateRepository<TModel, TQuery> {
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
    protected readonly queryToUpdateQueryConverter: Converter<
      TQuery,
      UpdateQuery<TModelDb> | Promise<UpdateQuery<TModelDb>>
    >,
  ) {}

  public async update(query: TQuery): Promise<TModel[]> {
    const entitiesDbUpdated: TModelDb[] = await this.innerUpdate(
      this.model.find.bind(this.model),
      query,
      this.model.updateMany.bind(this.model),
    );

    const entitiesUpdated: TModel[] = await Promise.all(
      entitiesDbUpdated.map((entityDb: TModelDb) =>
        this.modelDbToModelConverter.transform(entityDb),
      ),
    );

    return entitiesUpdated;
  }
  public async updateOne(query: TQuery): Promise<TModel | null> {
    const entityDbUpdated: TModelDb | null = await this.innerUpdate(
      this.model.findOne.bind(this.model),
      query,
      this.model.updateOne.bind(this.model),
    );

    const entityUpdated: TModel | null =
      entityDbUpdated === null
        ? null
        : await this.modelDbToModelConverter.transform(entityDbUpdated);

    return entityUpdated;
  }

  private async innerUpdate<TMongooseQueryOutput>(
    documentFindQueryGenerator: (
      filterQuery: FilterQuery<TModelDb>,
    ) => DocumentQuery<TMongooseQueryOutput, TModelDb>,
    query: TQuery,
    updateFn: (
      conditions: FilterQuery<TModelDb>,
      doc: UpdateQuery<TModelDb>,
      options: ModelUpdateOptions,
    ) => Query<unknown>,
  ): Promise<TMongooseQueryOutput> {
    const session: ClientSession = await mongoose.startSession();

    session.startTransaction();

    const filterQuery: FilterQuery<TModelDb> = await this.queryToFilterQueryConverter.transform(
      query,
    );
    const updateQuery: UpdateQuery<TModelDb> = await this.queryToUpdateQueryConverter.transform(
      query,
    );

    await updateFn(filterQuery, updateQuery, { session: session });

    const entityDbDocumentQuery: DocumentQuery<
      TMongooseQueryOutput,
      TModelDb
    > = documentFindQueryGenerator(filterQuery).session(session);

    const outputDb: TMongooseQueryOutput = await entityDbDocumentQuery;

    await session.commitTransaction();

    session.endSession();

    return outputDb;
  }
}
