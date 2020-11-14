import { FilterQuery, MongooseFilterQuery, Types } from 'mongoose';
import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { injectable } from 'inversify';

@injectable()
export class GameSetupUpdateQueryToExtendedGameSetupDbFilterQueryConverter
  implements Converter<GameSetupUpdateQuery, FilterQuery<ExtendedGameSetupDb>> {
  public transform(
    input: GameSetupUpdateQuery,
  ): FilterQuery<ExtendedGameSetupDb> {
    const filterQuery: MongooseFilterQuery<ExtendedGameSetupDb> = {
      _id: Types.ObjectId(input.id),
    };

    return filterQuery;
  }
}
