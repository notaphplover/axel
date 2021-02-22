import { CardType } from '../../model/card/CardType';
import { BaseCardCreationQuery } from './BaseCardCreationQuery';

export interface LandCreationQuery extends BaseCardCreationQuery {
  type: CardType.Land;
}
