import { inject, injectable } from 'inversify';

import { Converter, Interactor } from '../../../../../../common/domain';
import { EntitiesNotFoundError } from '../../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { GameSetupUpdateQueryAdditionalPlayerSetupApiV1 } from '../../query/setup/GameSetupUpdateQueryPlayerSetupApiV1';

@injectable()
export class GameSetupUpdateQueryAdditionalPlayerSetupApiV1ArrayToPlayerSetupArrayConverter
  implements
    Converter<
      GameSetupUpdateQueryAdditionalPlayerSetupApiV1[],
      Promise<PlayerSetup[]>
    > {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.deck.FIND_CARD_DECKS_INTERACTOR)
    private readonly findCardDecksInteractor: Interactor<
      CardDeckFindQuery,
      Promise<CardDeck[]>
    >,
  ) {}

  public async transform(
    input: GameSetupUpdateQueryAdditionalPlayerSetupApiV1[],
  ): Promise<PlayerSetup[]> {
    const gameSetupPlayerSetupsDeckIds: string[] = input.map(
      (playerSetup: GameSetupUpdateQueryAdditionalPlayerSetupApiV1) =>
        playerSetup.deckId,
    );

    const gameSetupPlayerSetupsDecksFindQuery: CardDeckFindQuery = {
      ids: gameSetupPlayerSetupsDeckIds,
    };

    const gameSetupPlayerSetupsDecks: CardDeck[] = await this.findCardDecksInteractor.interact(
      gameSetupPlayerSetupsDecksFindQuery,
    );

    return input.map(
      (
        gameSetupUpdateQueryAdditionalPlayerSetupApiV1: GameSetupUpdateQueryAdditionalPlayerSetupApiV1,
      ): PlayerSetup => {
        const playerSetupDeck:
          | CardDeck
          | undefined = gameSetupPlayerSetupsDecks.find(
          (cardDeck: CardDeck) =>
            cardDeck.id ===
            gameSetupUpdateQueryAdditionalPlayerSetupApiV1.deckId,
        );

        if (playerSetupDeck === undefined) {
          throw new EntitiesNotFoundError(
            `playerSetup deck for id ${gameSetupUpdateQueryAdditionalPlayerSetupApiV1.deckId} not found`,
          );
        }

        const playerSetup: PlayerSetup = {
          deckId: playerSetupDeck.id,
          userId: gameSetupUpdateQueryAdditionalPlayerSetupApiV1.userId,
        };

        return playerSetup;
      },
    );
  }
}
