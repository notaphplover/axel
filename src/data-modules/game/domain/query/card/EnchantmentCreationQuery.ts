import { BaseCardCreationQuery } from './BaseCardCreationQuery';
import { CardType } from '../../model/card/CardType';

export interface EnchantmentCreationQuery extends BaseCardCreationQuery {
  type: CardType.Enchantment;
}
