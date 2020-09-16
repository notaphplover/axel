import { Card } from './Card';
import { CardType } from './CardType';

export interface Creature extends Card {
  type: CardType.Creature;
  power: number;
  toughness: number;
}
