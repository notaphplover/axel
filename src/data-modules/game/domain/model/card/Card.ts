import { BaseCard } from './BaseCard';
import { CardType } from './CardType';

export interface Card extends BaseCard {
  type: CardType.Creature;
  power: number;
  toughness: number;
}
