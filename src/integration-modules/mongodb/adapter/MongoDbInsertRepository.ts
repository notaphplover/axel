import { injectable, unmanaged } from 'inversify';
import { Converter } from '../../../common/domain';
import { Document } from './model/Document';
import { EntitiesNotCreatedError } from '../../../layer-modules/db/domain';
import { MongoDbConnector } from './MongoDbConnector';
import mongodb from 'mongodb';

const MONGODB_DUPLICATED_KEY_ERR_CODE: number = 11000;

@injectable()
export abstract class MongoDbInsertRepository<
  TModel,
  TModelDb extends Document,
  TQuery
> {
  private innerCollection: mongodb.Collection<TModelDb> | undefined;

  constructor(
    @unmanaged()
    protected readonly collectionName: string,
    @unmanaged()
    protected readonly modelDbToModelConverter: Converter<
      TModelDb,
      TModel | Promise<TModel>
    >,
    @unmanaged()
    protected readonly mongoDbConnector: MongoDbConnector,
    protected readonly queryToInputModelDbs: Converter<
      TQuery,
      mongodb.OptionalId<TModelDb>[] | Promise<mongodb.OptionalId<TModelDb>[]>
    >,
  ) {}

  private get collection(): mongodb.Collection<TModelDb> {
    if (this.innerCollection === undefined) {
      this.innerCollection = this.mongoDbConnector.db.collection<TModelDb>(
        this.collectionName,
      );
    }

    return this.innerCollection;
  }

  public async insert(query: TQuery): Promise<TModel[]> {
    const entitiesDbToInsert: mongodb.OptionalId<TModelDb>[] = await this.queryToInputModelDbs.transform(
      query,
    );

    let entitiesDbCreated: TModelDb[];
    try {
      const entitiesDbInsertionOperation: mongodb.InsertWriteOpResult<
        mongodb.WithId<TModelDb>
      > = await this.collection.insertMany(entitiesDbToInsert);

      entitiesDbCreated = entitiesDbInsertionOperation.ops as TModelDb[];
    } catch (err) {
      if (
        err instanceof mongodb.MongoError &&
        err.code === MONGODB_DUPLICATED_KEY_ERR_CODE
      ) {
        throw new EntitiesNotCreatedError(
          'Entities could not be created due to a duplicated key error',
        );
      } else {
        throw err;
      }
    }

    const entitiesCreated: TModel[] = await Promise.all(
      entitiesDbCreated.map((entityDb: TModelDb) =>
        this.modelDbToModelConverter.transform(entityDb),
      ),
    );

    return entitiesCreated;
  }
}
