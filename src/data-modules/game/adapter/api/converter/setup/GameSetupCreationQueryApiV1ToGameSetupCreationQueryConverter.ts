import { Converter, Interactor } from '../../../../../../common/domain';
import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { EntitiesNotFoundError } from '../../../../../../layer-modules/db/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { GameFormatApiV1 } from '../../model/GameFormatApiV1';
import { GameSetupCreationQueryApiV1 } from '../../query/setup/GameSetupCreationQueryApiV1';
import { GameSetupCreationQueryPlayerSetupApiV1 } from '../../query/setup/GameSetupCreationQueryPlayerSetupApiV1';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';

@injectable()
export class GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter
  implements
    Converter<GameSetupCreationQueryApiV1, Promise<GameSetupsCreationQuery>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.deck.FIND_CARD_DECKS_INTERACTOR)
    private readonly findCardDecksInteractor: Interactor<
      CardDeckFindQuery,
      Promise<CardDeck[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter
        .GAME_FORMAT_API_V1_TO_GAME_FORMAT_CONVERTER,
    )
    private readonly gameFormatApiV1ToGameFormatConverter: Converter<
      GameFormatApiV1,
      GameFormat
    >,
  ) {}

  public async transform(
    input: GameSetupCreationQueryApiV1,
  ): Promise<GameSetupsCreationQuery> {
    const gameSetupPlayerSetupsDeckIds: string[] = input.playerSetups.map(
      (playerSetup: GameSetupCreationQueryPlayerSetupApiV1) =>
        playerSetup.deckId,
    );

    const gameSetupPlayerSetupsDecksFindQuery: CardDeckFindQuery = {
      ids: gameSetupPlayerSetupsDeckIds,
    };

    const gameSetupPlayerSetupsDecks: CardDeck[] = await this.findCardDecksInteractor.interact(
      gameSetupPlayerSetupsDecksFindQuery,
    );

    const gameSetupsCreationQuery: GameSetupsCreationQuery = {
      format: this.gameFormatApiV1ToGameFormatConverter.transform(input.format),
      ownerUserId: input.ownerUserId,
      playerSetups: input.playerSetups.map(
        (
          gameSetupCreationQueryPlayerSetupApiV1: GameSetupCreationQueryPlayerSetupApiV1,
        ): PlayerSetup => {
          const playerSetupDeck:
            | CardDeck
            | undefined = gameSetupPlayerSetupsDecks.find(
            (cardDeck: CardDeck) =>
              cardDeck.id === gameSetupCreationQueryPlayerSetupApiV1.deckId,
          );

          if (playerSetupDeck === undefined) {
            throw new EntitiesNotFoundError(
              `playerSetup deck for id ${gameSetupCreationQueryPlayerSetupApiV1.deckId} not found`,
            );
          }

          const playerSetup: PlayerSetup = {
            deckId: playerSetupDeck.id,
            userId: gameSetupCreationQueryPlayerSetupApiV1.userId,
          };

          return playerSetup;
        },
      ),
      playerSlots: input.playerSlots,
    };

    return gameSetupsCreationQuery;
  }
}
