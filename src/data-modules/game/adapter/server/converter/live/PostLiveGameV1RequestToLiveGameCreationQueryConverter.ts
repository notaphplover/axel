import * as fastify from 'fastify';
import {
  Converter,
  Interactor,
  Validator,
} from '../../../../../../common/domain';
import { User, UserContainer } from '../../../../../user/domain';
import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { LiveGameCreationQuery } from '../../../../domain/query/live/LiveGameCreationQuery';
import { LiveGameCreationQueryApiV1 } from '../../../api/query/live/LiveGameCreationQueryApiV1';
import { LiveGameCreationQueryApiV1ValidationContext } from '../../../api/validator/live/LiveGameCreationQueryApiV1ValidationContext';
import { RequestToQueryConverter } from '../../../../../../layer-modules/server/adapter';
import { ValueOrErrors } from '../../../../../../common/domain/either/ValueOrErrors';

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

      const context: LiveGameCreationQueryApiV1ValidationContext = {
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

  private async getGameSetupFromQueryApi(
    queryApi: LiveGameCreationQueryApiV1,
  ): Promise<ValueOrErrors<GameSetup>> {
    const gameSetupFindQuery: GameSetupFindQuery = {
      id: queryApi.gameSetupIdId,
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
