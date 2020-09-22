import { BaseCard } from './BaseCard';
import { CardType } from './CardType';

export interface Creature extends BaseCard {
  type: CardType.Creature;
  power: number;
  toughness: number;
}
