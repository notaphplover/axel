import { GameFormat } from '../GameFormat';

export interface CardDeckSections {
  core: CardSetReferences;
  sideboard: CardSetReferences;
}

export interface CardSetReferences {
  references: number[];
}

export interface CardDeck {
  sections: CardDeckSections
  description: string;
  format: GameFormat;
  id: string;
  name: string;
}
