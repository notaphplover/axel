import { CardType } from '../../../../domain/model/card/CardType';
import { CardDb } from './CardDb';

export interface CreatureDb extends CardDb {
  type: CardType.Creature;
  power: number;
  toughness: number;
}
