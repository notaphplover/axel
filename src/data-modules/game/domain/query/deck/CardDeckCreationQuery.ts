import { CardDeckSections } from '../../model/deck/CardDeckSections';
import { GameFormat } from '../../model/GameFormat';

export interface CardDeckCreationQuery {
  sections: CardDeckSections;
  description: string;
  format: GameFormat;
  name: string;
}
