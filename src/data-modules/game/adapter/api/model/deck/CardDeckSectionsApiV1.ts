import { CardSetReferencesApiV1 } from './CardSetReferencesApiV1';

export interface CardDeckSectionsApiV1 {
  core: CardSetReferencesApiV1;
  sideboard: CardSetReferencesApiV1;
}
