import { CardType } from '../../model/card/CardType';
import { BaseCardCreationQuery } from './BaseCardCreationQuery';

export interface CardCreationQuery extends BaseCardCreationQuery {
  type: CardType.Creature;
  power: number;
  toughness: number;
}
