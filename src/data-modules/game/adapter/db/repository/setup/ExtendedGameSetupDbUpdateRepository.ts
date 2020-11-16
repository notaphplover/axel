import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetup } from '../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { MongooseUpdateRepository } from '../../../../../../integration-modules/mongoose/adapter';

@injectable()
export class ExtendedGameSetupDbUpdateRepository extends MongooseUpdateRepository<
  ExtendedGameSetup,
  GameSetupUpdateQuery,
  ExtendedGameSetupDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.setup.EXTENDED_GAME_SETUP_DB_MODEL)
    extendedGameSetupDbModel: Model<ExtendedGameSetupDb>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .EXTENDED_GAME_SETUP_DB_TO_EXTENDED_GAME_SETUP_CONVERTER,
    )
    extendedGameSetupDbToExtendedGameSetupConverter: Converter<
      ExtendedGameSetupDb,
      ExtendedGameSetup
    >,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_UPDATE_QUERY_TO_EXTENDED_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
    )
    gameSetupUpdateQueryToExtendedGameSetupDbFilterQueryConverter: Converter<
      GameSetupUpdateQuery,
      FilterQuery<ExtendedGameSetupDb>
    >,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_UPDATE_QUERY_TO_EXTENDED_GAME_SETUP_DB_UPDATE_QUERY_CONVERTER,
    )
    gameSetupUpdateQueryToExtendedGameSetupDbUpdateQueryConverter: Converter<
      GameSetupUpdateQuery,
      UpdateQuery<ExtendedGameSetupDb>
    >,
  ) {
    super(
      extendedGameSetupDbModel,
      extendedGameSetupDbToExtendedGameSetupConverter,
      gameSetupUpdateQueryToExtendedGameSetupDbFilterQueryConverter,
      gameSetupUpdateQueryToExtendedGameSetupDbUpdateQueryConverter,
    );
  }
}
