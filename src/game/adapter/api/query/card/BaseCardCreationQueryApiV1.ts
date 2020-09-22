import { CardType } from '../../../../domain/model/card/CardType';
import { Resource } from '../../../../domain/model/card/Resource';

export interface BaseCardCreationQueryApiV1 {
  cost: Resource;
  type: CardType;
}
