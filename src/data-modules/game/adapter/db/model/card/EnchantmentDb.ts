import { CardDb } from './CardDb';
import { CardType } from '../../../../domain/model/card/CardType';

export interface EnchantmentDb extends CardDb {
  type: CardType.Enchantment;
}
