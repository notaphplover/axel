import { CardDetailApiV1 } from '../../model/card/CardDetailApiV1';
import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';
import { ResourceApiV1 } from '../../model/card/ResourceApiV1';

export interface CardCreationQueryApiV1 {
  cost: ResourceApiV1;
  detail: CardDetailApiV1;
  power?: number;
  toughness?: number;
  type: CardTypeApiV1;
}
