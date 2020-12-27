import { Converter, Interactor } from '../../../../../../common/domain';
import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { EntitiesNotFoundError } from '../../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { GameSetupUpdateQueryAdditionalPlayerSetupApiV1 } from '../../query/setup/GameSetupUpdateQueryPlayerSetupApiV1';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';

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
            `playerSetup for id ${gameSetupUpdateQueryAdditionalPlayerSetupApiV1.deckId} not found`,
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
