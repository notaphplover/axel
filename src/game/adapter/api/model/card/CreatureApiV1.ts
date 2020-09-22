import { BaseCardApiV1 } from './BaseCardApiV1';
import { CardTypeApiV1 } from './CardTypeApiV1';

export interface CreatureApiV1 extends BaseCardApiV1 {
  type: CardTypeApiV1.Creature;
  power: number;
  toughness: number;
}
