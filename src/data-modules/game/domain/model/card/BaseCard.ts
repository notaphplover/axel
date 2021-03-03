import { CardDetail } from './CardDetail';
import { CardSubtype } from './CardSubtype';
import { CardSupertype } from './CardSupertype';
import { CardType } from './CardType';
import { Resource } from './Resource';

export interface BaseCard {
  cost: Resource;
  detail: CardDetail;
  id: string;
  subtypes: CardSubtype[];
  supertypes: CardSupertype[];
  type: CardType;
}
