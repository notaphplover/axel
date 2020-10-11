import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { Creature } from '../../../../domain/model/card/Creature';
import { CreatureCreationQuery } from '../../../../domain/query/card/CreatureCreationQuery';
import { CreatureDb } from '../../model/card/CreatureDb';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { Model } from 'mongoose';
import { MongooseInsertRepository } from '../../../../../../layer-modules/db/adapter';

@injectable()
export class CreatureDbInsertRepository extends MongooseInsertRepository<
  Creature,
  CreatureCreationQuery,
  CreatureDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.card.CREATURE_DB_MODEL)
    model: Model<CreatureDb>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card.CREATURE_DB_TO_CREATURE_CONVERTER,
    )
    creatureDbToCreatureConverter: Converter<CreatureDb, Creature>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
        .CREATURE_CREATION_QUERY_TO_CREATURE_DBS_CONVERTER,
    )
    creatureCreationQueryToCreatureDbsConverter: Converter<
      CreatureCreationQuery,
      CreatureDb[]
    >,
  ) {
    super(
      model,
      creatureDbToCreatureConverter,
      creatureCreationQueryToCreatureDbsConverter,
    );
  }
}
