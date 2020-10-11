import { BaseCardCreationQueryApiV1 } from './BaseCardCreationQueryApiV1';
import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';

export interface CreatureCreationQueryApiV1 extends BaseCardCreationQueryApiV1 {
  power: number;
  toughness: number;
  type: CardTypeApiV1.Creature;
}
