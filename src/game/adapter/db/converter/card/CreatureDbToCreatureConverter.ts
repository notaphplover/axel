import { Converter } from '../../../../../common/domain';
import { Creature } from '../../../../domain/model/card/Creature';
import { CreatureDb } from '../../model/card/CreatureDb';
import { injectable } from 'inversify';

@injectable()
export class CreatureDbToCreatureConverter
  implements Converter<CreatureDb, Creature> {
  public transform(input: CreatureDb): Creature {
    return {
      cost: input.cost,
      id: input._id.toHexString(),
      type: input.type,
      power: input.power,
      toughness: input.toughness,
    };
  }
}
