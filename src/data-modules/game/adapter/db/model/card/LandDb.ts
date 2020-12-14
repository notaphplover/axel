import { CardDb } from './CardDb';
import { CardType } from '../../../../domain/model/card/CardType';

export interface LandDb extends CardDb {
  type: CardType.Land;
}
