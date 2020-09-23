import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';
import { ResourceApiV1 } from '../../model/card/ResourceApiV1';

export interface BaseCardCreationQueryApiV1 {
  cost: ResourceApiV1;
  type: CardTypeApiV1;
}
