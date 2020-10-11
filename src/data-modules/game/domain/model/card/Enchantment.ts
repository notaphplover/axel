import { BaseCard } from './BaseCard';
import { CardType } from './CardType';

export interface Enchantment extends BaseCard {
  type: CardType.Enchantment;
}
