import { BaseCardApiV1 } from './BaseCardApiV1';
import { CardTypeApiV1 } from './CardTypeApiV1';

export interface EnchantmentApiV1 extends BaseCardApiV1 {
  type: CardTypeApiV1.Enchantment;
}
