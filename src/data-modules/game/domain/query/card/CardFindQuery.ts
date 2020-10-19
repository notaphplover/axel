import { CardType } from '../../model/card/CardType';
import { PaginationQuery } from '../../../../../common/domain';

export interface CardFindQuery extends PaginationQuery {
  id?: string;
  types?: CardType | CardType[];
}
