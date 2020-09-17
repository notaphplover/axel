import { CardType } from '../../model/card/CardType';
import { Resource } from '../../model/card/Resource';

export interface CardCreationQuery {
  cost: Resource;
  type: CardType;
}
