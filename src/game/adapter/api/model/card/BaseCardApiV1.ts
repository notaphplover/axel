import { CardTypeApiV1 } from './CardTypeApiV1';
import { ResourceTypeApiV1 } from './ResourceTypeApiV1';

export interface BaseCardApiV1 {
  cost: ResourceTypeApiV1;
  id: string;
  type: CardTypeApiV1;
}
