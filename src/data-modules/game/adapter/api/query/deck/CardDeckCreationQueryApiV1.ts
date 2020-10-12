import { CardDeckSectionsApiV1 } from '../../model/deck/CardDeckSectionsApiV1';
import { GameFormatApiV1 } from '../../model/GameFormatApiV1';

export interface CardDeckCreationQueryApiV1 {
  sections: CardDeckSectionsApiV1;
  description: string;
  format: GameFormatApiV1;
  name: string;
}
