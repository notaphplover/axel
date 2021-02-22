import * as fastify from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { Converter, Interactor } from '../../../../../../common/domain';
import { ValueOrErrors } from '../../../../../../common/domain/either/ValueOrErrors';
import { FastifyRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { UserContainer } from '../../../../../user/domain';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { BasicGameSetupApiV1 } from '../../../api/model/setup/BasicGameSetupApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PatchGameSetupByIdV1RequestHandler
  implements FastifyRequestHandler<fastify.FastifyRequest & UserContainer> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_TO_BASIC_GAME_SETUP_API_V1_CONVERTER,
    )
    private readonly gameSetupToBasicGameSetupApiV1Converter: Converter<
      GameSetup,
      BasicGameSetupApiV1
    >,
    @inject(
      GAME_ADAPTER_TYPES.server.converter.setup
        .PATCH_GAME_SETUP_BY_ID_V1_REQUEST_TO_GAME_SETUP_UPDATE_QUERY_CONVERTER,
    )
    private readonly patchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter: Converter<
      fastify.FastifyRequest & UserContainer,
      Promise<ValueOrErrors<GameSetupUpdateQuery>>
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.setup.UPDATE_GAME_SETUP_INTERACTOR)
    private readonly updateGameSetupInteractor: Interactor<
      GameSetupUpdateQuery,
      Promise<GameSetup | null>
    >,
  ) {}

  public async handle(
    request: fastify.FastifyRequest & UserContainer,
    reply: fastify.FastifyReply,
  ): Promise<void> {
    const gameSetupUpdateQueryOrErrors: ValueOrErrors<GameSetupUpdateQuery> = await this.patchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter.transform(
      request,
    );

    if (gameSetupUpdateQueryOrErrors.isEither) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: gameSetupUpdateQueryOrErrors.value.join('\n') });
    } else {
      const gameSetupUpdateQuery: GameSetupUpdateQuery =
        gameSetupUpdateQueryOrErrors.value;

      const gameSetupUpdated: GameSetup | null = await this.updateGameSetupInteractor.interact(
        gameSetupUpdateQuery,
      );

      if (gameSetupUpdated === null) {
        await reply
          .code(StatusCodes.NOT_FOUND)
          .send({ message: 'No game setup was found to be updated' });
      } else {
        const basicGameSetupApiV1Updated: BasicGameSetupApiV1 = this.gameSetupToBasicGameSetupApiV1Converter.transform(
          gameSetupUpdated,
        );

        await reply.send(basicGameSetupApiV1Updated);
      }
    }
  }
}
