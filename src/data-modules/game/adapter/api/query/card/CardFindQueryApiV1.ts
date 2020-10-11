import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';

export interface CardFindQueryApiV1 {
  id?: string;
  types?: CardTypeApiV1 | CardTypeApiV1[];
}
