import { CardDeckSections } from './CardDeckSections';
import { GameFormat } from '../GameFormat';

export interface CardDeck {
  sections: CardDeckSections;
  description: string;
  format: GameFormat;
  id: string;
  name: string;
}
