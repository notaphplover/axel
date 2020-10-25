import { FilterQuery, Model } from 'mongoose';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetup } from '../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { ExtendedGameSetupFindQuery } from '../../../../domain/query/setup/ExtendedGameSetupFindQuery';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { MongoosePaginatedSearchRepository } from '../../../../../../layer-modules/db/adapter';

@injectable()
export class ExtendedGameSetupDbSearchRepository extends MongoosePaginatedSearchRepository<
  ExtendedGameSetup,
  ExtendedGameSetupDb,
  ExtendedGameSetupFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.setup.EXTENDED_GAME_SETUP_DB_MODEL)
    model: Model<ExtendedGameSetupDb>,
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
        .GAME_SETUP_FIND_QUERY_TO_EXTENDED_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
    )
    extendedGameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter: Converter<
      ExtendedGameSetupFindQuery,
      FilterQuery<ExtendedGameSetupDb>
    >,
  ) {
    super(
      model,
      extendedGameSetupDbToExtendedGameSetupConverter,
      extendedGameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter,
    );
  }
}
