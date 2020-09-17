import { CardCreationQuery } from './CardCreationQuery';
import { CardType } from '../../model/card/CardType';

export interface EnchantmentCreationQuery extends CardCreationQuery {
  type: CardType.Enchantment;
}
