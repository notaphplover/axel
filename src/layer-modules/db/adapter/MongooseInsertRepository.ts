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
    protected readonly modelDbToModelConverter: Converter<TModelDb, TModel>,
    protected readonly queryToInputModelDbs: Converter<TQuery, TModelDb[]>,
  ) {}

  public async insert(query: TQuery): Promise<TModel[]> {
    const entitiesDb: TModelDb[] = this.queryToInputModelDbs.transform(query);
    const entitiesDbCreated: TModelDb[] = await this.model.insertMany(
      entitiesDb,
    );
    const entitiesCreated: TModel[] = entitiesDbCreated.map(
      (entityDb: TModelDb) => this.modelDbToModelConverter.transform(entityDb),
    );

    return entitiesCreated;
  }
}
