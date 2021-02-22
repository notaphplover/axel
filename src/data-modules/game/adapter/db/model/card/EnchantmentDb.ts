import { CardType } from '../../../../domain/model/card/CardType';
import { CardDb } from './CardDb';

export interface EnchantmentDb extends CardDb {
  type: CardType.Enchantment;
}
