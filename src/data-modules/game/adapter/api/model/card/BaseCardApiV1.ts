import { CardDetailApiV1 } from './CardDetailApiV1';
import { CardSubtypeApiV1 } from './CardSubtypeApiV1';
import { CardSupertypeApiV1 } from './CardSupertypeApiV1';
import { CardTypeApiV1 } from './CardTypeApiV1';
import { ResourceApiV1 } from './ResourceApiV1';

export interface BaseCardApiV1 {
  cost: ResourceApiV1;
  detail: CardDetailApiV1;
  id: string;
  subtypes: CardSubtypeApiV1[];
  supertypes: CardSupertypeApiV1[];
  type: CardTypeApiV1;
}
