import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetup } from '../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { ExtendedGameSetupsCreationQuery } from '../../../../domain/query/setup/ExtendedGameSetupCreationQuery';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { Model } from 'mongoose';
import { MongooseInsertRepository } from '../../../../../../layer-modules/db/adapter';

@injectable()
export class ExtendedGameSetupDbInsertRepository extends MongooseInsertRepository<
  ExtendedGameSetup,
  ExtendedGameSetupsCreationQuery,
  ExtendedGameSetupDb
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
        .EXTENDED_GAME_SETUP_CREATION_QUERY_TO_EXTENDED_GAME_SETUP_DBS_CONVERTER,
    )
    extendedGameSetupCreationQueryToExtendedGameSetupDbsConverter: Converter<
      ExtendedGameSetupsCreationQuery,
      ExtendedGameSetupDb[]
    >,
  ) {
    super(
      model,
      extendedGameSetupDbToExtendedGameSetupConverter,
      extendedGameSetupCreationQueryToExtendedGameSetupDbsConverter,
    );
  }
}
