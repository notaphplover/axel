import { User } from '../../../../../user/domain';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';

export interface LiveGameCreationQueryApiV1ValidationContext {
  readonly deckIdToDeckMap: Map<string, CardDeck>;
  readonly gameSetup: GameSetup;
  readonly user: User;
}
