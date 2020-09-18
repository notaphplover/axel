import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../common/domain';
import { CreatureCreationQuery } from '../../../../domain/query/card/CreatureCreationQuery';
import { CreatureDb } from '../../model/card/CreatureDb';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { Model } from 'mongoose';

@injectable()
export class CreatureCreationQueryToCreatureDbsConverter
  implements Converter<CreatureCreationQuery, CreatureDb[]> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.card.CREATURE_DB_MODEL)
    private readonly creatureDbModel: Model<CreatureDb>,
  ) {}

  public transform(input: CreatureCreationQuery): CreatureDb[] {
    return [
      new this.creatureDbModel({
        cost: input.cost,
        type: input.type,
        power: input.power,
        toughness: input.toughness,
      }),
    ];
  }
}
