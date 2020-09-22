import { CardType } from '../../model/card/CardType';
import { Resource } from '../../model/card/Resource';

export interface BaseCardCreationQuery {
  cost: Resource;
  type: CardType;
}
