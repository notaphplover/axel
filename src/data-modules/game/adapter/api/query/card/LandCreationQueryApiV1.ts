import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';
import { BaseCardCreationQueryApiV1 } from './BaseCardCreationQueryApiV1';

export interface LandCreationQueryApiV1 extends BaseCardCreationQueryApiV1 {
  type: CardTypeApiV1.Land;
}
