import { CardCreationQuery } from './CardCreationQuery';
import { CardType } from '../../model/card/CardType';

export interface LandCreationQuery extends CardCreationQuery {
  type: CardType.Land;
}
