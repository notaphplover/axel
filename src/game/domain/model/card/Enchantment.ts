import { Card } from './Card';
import { CardType } from './CardType';

export interface Enchantment extends Card {
  type: CardType.Enchantment;
}
