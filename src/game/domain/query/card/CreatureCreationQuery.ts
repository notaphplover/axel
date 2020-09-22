import { BaseCardCreationQuery } from './BaseCardCreationQuery';
import { CardType } from '../../model/card/CardType';

export interface CreatureCreationQuery extends BaseCardCreationQuery {
  type: CardType.Creature;
  power: number;
  toughness: number;
}
