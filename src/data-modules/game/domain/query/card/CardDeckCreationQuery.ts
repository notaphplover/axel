import { CardDeckSections } from '../../model/card/CardDeck';
import { GameFormat } from '../../model/GameFormat';

export interface CardDeckCreationQuery {
  sections: CardDeckSections;
  description: string;
  format: GameFormat;
  name: string;
}
