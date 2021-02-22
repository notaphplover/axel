import { CardType } from '../../model/card/CardType';
import { BaseCardCreationQuery } from './BaseCardCreationQuery';

export interface EnchantmentCreationQuery extends BaseCardCreationQuery {
  type: CardType.Enchantment;
}
