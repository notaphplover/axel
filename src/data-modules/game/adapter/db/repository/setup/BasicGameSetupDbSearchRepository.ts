import { FilterQuery, Model } from 'mongoose';
import { inject, injectable } from 'inversify';
import { BasicGameSetup } from '../../../../domain/model/setup/BasicGameSetup';
import { BasicGameSetupDb } from '../../model/setup/BasicGameSetupDb';
import { BasicGameSetupFindQuery } from '../../../../domain/query/setup/BasicGameSetupFindQuery';
import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { ExtendedGameSetupFindQuery } from '../../../../domain/query/setup/ExtendedGameSetupFindQuery';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { MongooseProjectionPaginatedSearchRepository } from '../../../../../../layer-modules/db/adapter';

@injectable()
export class BasicGameSetupDbSearchRepository extends MongooseProjectionPaginatedSearchRepository<
  BasicGameSetup,
  ExtendedGameSetupDb,
  BasicGameSetupDb,
  ExtendedGameSetupFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.setup.EXTENDED_GAME_SETUP_DB_MODEL)
    model: Model<ExtendedGameSetupDb>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .EXTENDED_GAME_SETUP_DB_TO_BASIC_GAME_SETUP_CONVERTER,
    )
    extendedGameSetupDbToBasicGameSetupConverter: Converter<
      ExtendedGameSetupDb,
      BasicGameSetup
    >,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_FIND_QUERY_TO_EXTENDED_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
    )
    gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter: Converter<
      BasicGameSetupFindQuery,
      FilterQuery<ExtendedGameSetupDb>
    >,
  ) {
    super(
      model,
      extendedGameSetupDbToBasicGameSetupConverter,
      gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter,
      { 'playerSetups.deck': 0 },
    );
  }
}
