import { Document, Model } from 'mongoose';
import { Converter } from '../../../common/domain';
import { InsertRepository } from '../domain/InsertRepository';
import { injectable } from 'inversify';

@injectable()
export abstract class MongooseInsertRepository<
  TInModel,
  TOutModel,
  TModelDb extends Document
> implements InsertRepository<TInModel, TOutModel> {
  constructor(
    protected readonly model: Model<TModelDb>,
    protected readonly modelDbToModelConverter: Converter<TModelDb, TOutModel>,
    protected readonly modelToModelDbConverter: Converter<TInModel, TModelDb>,
  ) {}

  public async insert(entities: TInModel[]): Promise<TOutModel[]> {
    const entitiesDb: TModelDb[] = entities.map((entity: TInModel) =>
      this.modelToModelDbConverter.transform(entity),
    );
    const entitiesDbCreated: TModelDb[] = await this.model.insertMany(
      entitiesDb,
    );
    const entitiesCreated: TOutModel[] = entitiesDbCreated.map(
      (entityDb: TModelDb) => this.modelDbToModelConverter.transform(entityDb),
    );

    return entitiesCreated;
  }

  public async insertOne(entity: TInModel): Promise<TOutModel> {
    const entityDb: TModelDb = this.modelToModelDbConverter.transform(entity);
    const entityDbCreated: TModelDb = await this.model.insertMany(entityDb);
    const entityCreated: TOutModel = this.modelDbToModelConverter.transform(
      entityDbCreated,
    );

    return entityCreated;
  }
}
