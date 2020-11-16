import { Converter, Interactor } from '../../../../../../common/domain';
import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { EntitiesNotFoundError } from '../../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { GameSetupUpdateQueryApiV1 } from '../../query/setup/GameSetupUpdateQueryApiV1';
import { GameSetupUpdateQueryPlayerSetupApiV1 } from '../../query/setup/GameSetupUpdateQueryPlayerSetupApiV1';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';

@injectable()
export class GameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter
  implements
    Converter<GameSetupUpdateQueryApiV1, Promise<GameSetupUpdateQuery>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.deck.FIND_CARD_DECKS_INTERACTOR)
    private readonly findCardDecksInteractor: Interactor<
      CardDeckFindQuery,
      Promise<CardDeck[]>
    >,
  ) {}

  public async transform(
    input: GameSetupUpdateQueryApiV1,
  ): Promise<GameSetupUpdateQuery> {
    const gameSetupPlayerSetupsDeckIds: string[] = input.additionalPlayerSetups.map(
      (playerSetup: GameSetupUpdateQueryPlayerSetupApiV1) => playerSetup.deckId,
    );

    const gameSetupPlayerSetupsDecksFindQuery: CardDeckFindQuery = {
      ids: gameSetupPlayerSetupsDeckIds,
    };

    const gameSetupPlayerSetupsDecks: CardDeck[] = await this.findCardDecksInteractor.interact(
      gameSetupPlayerSetupsDecksFindQuery,
    );

    const additionalPlayerSetups: PlayerSetup[] = input.additionalPlayerSetups.map(
      (playerSetup: GameSetupUpdateQueryPlayerSetupApiV1) => {
        const playerSetupDeck:
          | CardDeck
          | undefined = gameSetupPlayerSetupsDecks.find(
          (cardDeck: CardDeck) => cardDeck.id === playerSetup.deckId,
        );

        if (playerSetupDeck === undefined) {
          throw new EntitiesNotFoundError(
            `playerSetup for id ${playerSetup.deckId} not found`,
          );
        }

        return {
          deck: playerSetupDeck,
          userId: playerSetup.userId,
        };
      },
    );

    return {
      additionalPlayerSetups: additionalPlayerSetups,
      id: input.id,
    };
  }
}
