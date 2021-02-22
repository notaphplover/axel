import { GameFormat } from '../GameFormat';
import { CardDeckSections } from './CardDeckSections';

export interface CardDeck {
  sections: CardDeckSections;
  description: string;
  format: GameFormat;
  id: string;
  name: string;
}
