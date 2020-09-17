import { CardCreationQuery } from './CardCreationQuery';
import { CardType } from '../../model/card/CardType';

export interface CreatureCreationQuery extends CardCreationQuery {
  type: CardType.Creature;
  power: number;
  toughness: number;
}
