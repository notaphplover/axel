import { GameFormat } from '../GameFormat';

export interface CardDeckSections {
  core: CardSetReferences;
  sideboard: CardSetReferences;
}

export interface CardSetReferences {
  references: string[];
}

export interface CardDeck {
  sections: CardDeckSections;
  description: string;
  format: GameFormat;
  id: string;
  name: string;
}
