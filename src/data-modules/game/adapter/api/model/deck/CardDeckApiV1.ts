import { GameFormatApiV1 } from '../GameFormatApiV1';
import { CardDeckSectionsApiV1 } from './CardDeckSectionsApiV1';

export interface CardDeckApiV1 {
  sections: CardDeckSectionsApiV1;
  description: string;
  format: GameFormatApiV1;
  id: string;
  name: string;
}
