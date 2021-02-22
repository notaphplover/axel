import { PaginationQuery } from '../../../../../common/domain';
import { CardType } from '../../model/card/CardType';

export interface CardFindQuery extends PaginationQuery {
  id?: string;
  types?: CardType | CardType[];
}
