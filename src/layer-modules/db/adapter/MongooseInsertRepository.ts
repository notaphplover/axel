import { Document, Model } from 'mongoose';
import { Converter } from '../../../common/domain';
import { InsertRepository } from '../domain/InsertRepository';
import { injectable } from 'inversify';

@injectable()
export abstract class MongooseInsertRepository<
  TModel,
  TQuery,
  TModelDb extends Document
> implements InsertRepository<TModel, TQuery> {
  constructor(
    protected readonly model: Model<TModelDb>,
    protected readonly modelDbToModelConverter: Converter<
      TModelDb,
      TModel | Promise<TModel>
    >,
    protected readonly queryToInputModelDbs: Converter<
      TQuery,
      TModelDb[] | Promise<TModelDb[]>
    >,
  ) {}

  public async insert(query: TQuery): Promise<TModel[]> {
    const entitiesDb: TModelDb[] = await this.queryToInputModelDbs.transform(
      query,
    );
    const entitiesDbCreated: TModelDb[] = await this.model.insertMany(
      entitiesDb,
    );
    const entitiesCreated: TModel[] = await Promise.all(
      entitiesDbCreated.map((entityDb: TModelDb) =>
        this.modelDbToModelConverter.transform(entityDb),
      ),
    );

    return entitiesCreated;
  }
}
