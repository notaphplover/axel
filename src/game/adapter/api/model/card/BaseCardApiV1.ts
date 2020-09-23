import { CardTypeApiV1 } from './CardTypeApiV1';
import { ResourceApiV1 } from './ResourceApiV1';

export interface BaseCardApiV1 {
  cost: ResourceApiV1;
  id: string;
  type: CardTypeApiV1;
}
