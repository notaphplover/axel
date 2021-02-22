import { PaginationQueryApiV1 } from '../../../../../../layer-modules/api/adapter';
import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';

export interface CardFindQueryApiV1 extends PaginationQueryApiV1 {
  id?: string;
  types?: CardTypeApiV1 | CardTypeApiV1[];
}
