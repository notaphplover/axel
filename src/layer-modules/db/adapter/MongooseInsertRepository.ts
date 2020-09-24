import { Document, Model } from 'mongoose';
import { Converter } from '../../../common/domain';
import { EntitiesNotCreatedError } from '../domain/exception/EntitiesNotCreatedError';
import { InsertRepository } from '../domain/InsertRepository';
import { MongoError } from 'mongodb';
import { injectable } from 'inversify';

const MONGODB_DUPLICATED_KEY_ERR_CODE: number = 11000;

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

    let entitiesDbCreated: TModelDb[];
    try {
      entitiesDbCreated = await this.model.insertMany(entitiesDb);
    } catch (err) {
      if (
        err instanceof MongoError &&
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
