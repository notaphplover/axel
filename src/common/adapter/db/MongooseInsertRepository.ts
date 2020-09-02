import { Document, Model } from 'mongoose';
import { Converter } from '../../domain/converter/Converter';
import { InsertRepository } from '../../domain/db/InsertRepository';
import { injectable } from 'inversify';

@injectable()
export abstract class MongooseInsertRepository<
  TModel,
  TModelDb extends Document
> implements InsertRepository<TModel> {
  constructor(
    protected readonly model: Model<TModelDb>,
    protected readonly modelDbToModelConverter: Converter<TModelDb, TModel>,
    protected readonly modelToModelDbConverter: Converter<TModel, TModelDb>,
  ) {}

  public async insert(entities: TModel[]): Promise<TModel[]> {
    const entitiesDb: TModelDb[] = entities.map(
      this.modelToModelDbConverter.transform.bind(this.modelToModelDbConverter),
    );
    const entitiesDbCreated: TModelDb[] = await this.model.insertMany(
      entitiesDb,
    );
    const entitiesCreated: TModel[] = entitiesDbCreated.map(
      this.modelDbToModelConverter.transform.bind(this.modelDbToModelConverter),
    );

    return entitiesCreated;
  }

  public async insertOne(entity: TModel): Promise<TModel> {
    const entityDb: TModelDb = this.modelToModelDbConverter.transform(entity);
    const entityDbCreated: TModelDb = await this.model.insertMany(entityDb);
    const entityCreated: TModel = this.modelDbToModelConverter.transform(
      entityDbCreated,
    );

    return entityCreated;
  }
}
