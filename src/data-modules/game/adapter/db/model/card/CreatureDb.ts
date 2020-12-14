import { CardDb } from './CardDb';
import { CardType } from '../../../../domain/model/card/CardType';

export interface CreatureDb extends CardDb {
  type: CardType.Creature;
  power: number;
  toughness: number;
}
