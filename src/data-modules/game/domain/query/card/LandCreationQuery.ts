import { BaseCardCreationQuery } from './BaseCardCreationQuery';
import { CardType } from '../../model/card/CardType';

export interface LandCreationQuery extends BaseCardCreationQuery {
  type: CardType.Land;
}
