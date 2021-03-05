import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';
import { BaseCardCreationQueryApiV1 } from './BaseCardCreationQueryApiV1';

export interface CardCreationQueryApiV1 extends BaseCardCreationQueryApiV1 {
  power: number;
  toughness: number;
  type: CardTypeApiV1.Creature;
}
