import { CardDetail } from '../../model/card/CardDetail';
import { CardType } from '../../model/card/CardType';
import { Resource } from '../../model/card/Resource';

export interface BaseCardCreationQuery {
  cost: Resource;
  detail: CardDetail;
  type: CardType;
}
