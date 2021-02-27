import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import {
  Converter,
  Interactor,
  Validator,
} from '../../../../../../common/domain';
import { ValueOrErrors } from '../../../../../../common/domain/either/ValueOrErrors';
import { RequestToQueryConverter } from '../../../../../../layer-modules/server/adapter';
import { User, UserContainer } from '../../../../../user/domain';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { LiveGameCreationQuery } from '../../../../domain/query/live/LiveGameCreationQuery';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { LiveGameCreationQueryApiV1 } from '../../../api/query/live/LiveGameCreationQueryApiV1';
import { LiveGameCreationQueryApiV1ValidationContext } from '../../../api/validator/live/LiveGameCreationQueryApiV1ValidationContext';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PostLiveGameV1RequestToLiveGameCreationQueryConverter extends RequestToQueryConverter<
  fastify.FastifyRequest & UserContainer,
  LiveGameCreationQuery,
  LiveGameCreationQueryApiV1,
  LiveGameCreationQueryApiV1ValidationContext
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.live
        .LIVE_GAME_CREATION_QUERY_API_V1_SEMANTIC_VALIDATOR,
    )
    contextBasedValidator: Validator<
      LiveGameCreationQueryApiV1,
      LiveGameCreationQueryApiV1,
      LiveGameCreationQueryApiV1ValidationContext
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.deck.FIND_CARD_DECKS_INTERACTOR)
    private readonly findCardDecksInteractor: Interactor<
      CardDeckFindQuery,
      Promise<CardDeck[]>
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.setup.FIND_GAME_SETUPS_INTERACTOR)
    private readonly findGameSetupsInteractor: Interactor<
      GameSetupFindQuery,
      Promise<GameSetup[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.live
        .LIVE_GAME_CREATION_QUERY_API_V1_TO_LIVE_GAME_CREATION_QUERY_CONVERTER,
    )
    queryApiToQueryConverter: Converter<
      LiveGameCreationQueryApiV1,
      Promise<LiveGameCreationQuery>,
      LiveGameCreationQueryApiV1ValidationContext
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.live
        .LIVE_GAME_CREATION_QUERY_API_V1_VALIDATOR,
    )
    syntaxValidator: Validator<LiveGameCreationQueryApiV1>,
  ) {
    super(contextBasedValidator, queryApiToQueryConverter, syntaxValidator);
  }

  protected extractRequestQuery(request: fastify.FastifyRequest): unknown {
    return request.body;
  }

  protected async getContextOrErrors(
    request: fastify.FastifyRequest & UserContainer,
    queryApi: LiveGameCreationQueryApiV1,
  ): Promise<ValueOrErrors<LiveGameCreationQueryApiV1ValidationContext>> {
    try {
      const gameSetupOrErrors: ValueOrErrors<GameSetup> = await this.getGameSetupFromQueryApi(
        queryApi,
      );

      if (gameSetupOrErrors.isEither) {
        return gameSetupOrErrors;
      }

      const user: User = this.getUserFromRequest(request);

      const gameSetup: GameSetup = gameSetupOrErrors.value;
      const deckIdTodeckMap: Map<
        string,
        CardDeck
      > = await this.getDeckIdToDeckMapFromGameSetup(gameSetup);

      const context: LiveGameCreationQueryApiV1ValidationContext = {
        deckIdToDeckMap: deckIdTodeckMap,
        gameSetup: gameSetupOrErrors.value,
        user: user,
      };

      const contextOrErrors: ValueOrErrors<LiveGameCreationQueryApiV1ValidationContext> = {
        isEither: false,
        value: context,
      };

      return contextOrErrors;
    } catch (err: unknown) {
      const contextOrErrors: ValueOrErrors<LiveGameCreationQueryApiV1ValidationContext> = {
        isEither: true,
        value: [(err as Error).message],
      };

      return contextOrErrors;
    }
  }

  private async getDeckIdToDeckMapFromGameSetup(
    gameSetup: GameSetup,
  ): Promise<Map<string, CardDeck>> {
    const cardDeckFindQuery: CardDeckFindQuery = {
      ids: gameSetup.playerSetups.map(
        (playerSetup: PlayerSetup) => playerSetup.deckId,
      ),
    };

    const cardDecks: CardDeck[] = await this.findCardDecksInteractor.interact(
      cardDeckFindQuery,
    );

    const cardDeckIdToCardDeckMap: Map<string, CardDeck> = new Map(
      cardDecks.map((cardDeck: CardDeck) => [cardDeck.id, cardDeck]),
    );

    return cardDeckIdToCardDeckMap;
  }

  private async getGameSetupFromQueryApi(
    queryApi: LiveGameCreationQueryApiV1,
  ): Promise<ValueOrErrors<GameSetup>> {
    const gameSetupFindQuery: GameSetupFindQuery = {
      id: queryApi.gameSetupId,
    };

    const gamesSetup: GameSetup[] = await this.findGameSetupsInteractor.interact(
      gameSetupFindQuery,
    );

    if (gamesSetup.length === 1) {
      const [gameSetup]: GameSetup[] = gamesSetup;

      const gameSetupOrErrors: ValueOrErrors<GameSetup> = {
        isEither: false,
        value: gameSetup,
      };

      return gameSetupOrErrors;
    } else {
      const gameSetupOrErrors: ValueOrErrors<GameSetup> = {
        isEither: true,
        value: ['Expecting a game setup to be found'],
      };

      return gameSetupOrErrors;
    }
  }

  private getUserFromRequest(
    request: fastify.FastifyRequest & UserContainer,
  ): User {
    return request.user;
  }
}
