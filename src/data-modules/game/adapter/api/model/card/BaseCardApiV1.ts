import { CardDetailApiV1 } from './CardDetailApiV1';
import { CardTypeApiV1 } from './CardTypeApiV1';
import { ResourceApiV1 } from './ResourceApiV1';

export interface BaseCardApiV1 {
  cost: ResourceApiV1;
  detail: CardDetailApiV1;
  id: string;
  type: CardTypeApiV1;
}
