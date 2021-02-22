import { CardType } from '../../../../domain/model/card/CardType';
import { CardDb } from './CardDb';

export interface LandDb extends CardDb {
  type: CardType.Land;
}
