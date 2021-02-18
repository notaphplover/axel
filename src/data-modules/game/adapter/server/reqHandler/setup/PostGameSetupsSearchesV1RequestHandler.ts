import * as fastify from 'fastify';
import { Converter, Interactor } from '../../../../../../common/domain';
import { inject, injectable } from 'inversify';
import { BasicGameSetupApiV1 } from '../../../api/model/setup/BasicGameSetupApiV1';
import { FastifyRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { StatusCodes } from 'http-status-codes';
import { ValueOrErrors } from '../../../../../../common/domain/either/ValueOrErrors';

@injectable()
export class PostGameSetupsSearchesV1RequestHandler
  implements FastifyRequestHandler {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_TO_BASIC_GAME_SETUP_API_V1_CONVERTER,
    )
    private readonly gameSetupToBasicGameSetupApiV1Converter: Converter<
      GameSetup,
      BasicGameSetupApiV1
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.setup.FIND_GAME_SETUPS_INTERACTOR)
    private readonly findGameSetupsInteractor: Interactor<
      GameSetupFindQuery,
      Promise<GameSetup[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.server.converter.setup
        .POST_GAME_SETUPS_SEARCHES_V1_REQUEST_TO_GAME_SETUP_FIND_QUERY_CONVERTER,
    )
    private readonly postGameSetupsSearchesV1RequestToGameSetupFindQueryConverter: Converter<
      fastify.FastifyRequest,
      Promise<ValueOrErrors<GameSetupFindQuery>>
    >,
  ) {}

  public async handle(
    request: fastify.FastifyRequest,
    reply: fastify.FastifyReply,
  ): Promise<void> {
    const gameSetupFindQueryOrErrors: ValueOrErrors<GameSetupFindQuery> = await this.postGameSetupsSearchesV1RequestToGameSetupFindQueryConverter.transform(
      request,
    );

    if (gameSetupFindQueryOrErrors.isEither) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: gameSetupFindQueryOrErrors.value.join('\n') });
    } else {
      const gameSetupFindQuery: GameSetupFindQuery =
        gameSetupFindQueryOrErrors.value;

      const gameSetupsFound: GameSetup[] = await this.findGameSetupsInteractor.interact(
        gameSetupFindQuery,
      );

      const basicGameSetypsApiV1Found: BasicGameSetupApiV1[] = gameSetupsFound.map(
        (gameSetup: GameSetup) =>
          this.gameSetupToBasicGameSetupApiV1Converter.transform(gameSetup),
      );

      await reply.send(basicGameSetypsApiV1Found);
    }
  }
}
