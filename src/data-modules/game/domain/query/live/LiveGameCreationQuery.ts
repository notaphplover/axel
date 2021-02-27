import { CardDeck } from '../../model/deck/CardDeck';
import { GameSetup } from '../../model/setup/GameSetup';

export interface LiveGameCreationQuery {
  deckIdToDeckMap: Map<string, CardDeck>;
  gameSetup: GameSetup;
}
