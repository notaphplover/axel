import { CardType } from '../../model/card/CardType';

export interface CardFindQuery {
  id?: string;
  types?: CardType | CardType[];
}
