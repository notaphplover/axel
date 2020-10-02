import { CardDetail } from './CardDetail';
import { CardType } from './CardType';
import { Resource } from './Resource';

export interface BaseCard {
  cost: Resource;
  detail: CardDetail;
  id: string;
  type: CardType;
}
