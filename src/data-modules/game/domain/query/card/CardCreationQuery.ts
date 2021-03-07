import { CardDetail } from '../../model/card/CardDetail';
import { CardType } from '../../model/card/CardType';
import { Resource } from '../../model/card/Resource';

export interface CardCreationQuery {
  cost: Resource;
  detail: CardDetail;
  power?: number;
  toughness?: number;
  type: CardType;
}
