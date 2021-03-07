import { CardDetail } from './CardDetail';
import { CardSubtype } from './CardSubtype';
import { CardSupertype } from './CardSupertype';
import { CardType } from './CardType';
import { Resource } from './Resource';

export interface Card {
  cost: Resource;
  detail: CardDetail;
  id: string;
  power?: number;
  subtypes: CardSubtype[];
  supertypes: CardSupertype[];
  toughness?: number;
  types: CardType[];
}
