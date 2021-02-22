import * as fastify from 'fastify';
import { Converter, Interactor } from '../../../../../../common/domain';
import { inject, injectable } from 'inversify';
import { ExtendedGameSetupApiV1 } from '../../../api/model/setup/ExtendedGameSetupApiV1';
import { FastifyRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { StatusCodes } from 'http-status-codes';
import { UserContainer } from '../../../../../user/domain';
import { ValueOrErrors } from '../../../../../../common/domain/either/ValueOrErrors';

@injectable()
export class PostGameSetupV1RequestHandler
  implements FastifyRequestHandler<fastify.FastifyRequest & UserContainer> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_TO_EXTENDED_GAME_SETUP_API_V1_CONVERTER,
    )
    private readonly gameSetupToExtendedGameSetupApiV1Converter: Converter<
      GameSetup,
      ExtendedGameSetupApiV1
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.setup.CREATE_GAME_SETUPS_INTERACTOR)
    private readonly createGameSetupsInteractor: Interactor<
      GameSetupsCreationQuery,
      Promise<GameSetup[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.server.converter.setup
        .POST_GAME_SETUP_V1_REQUEST_TO_GAME_SETUPS_CREATION_QUERY_CONVERTER,
    )
    private readonly postGameSetupV1RequestToGameSetupsCreationQueryConverter: Converter<
      fastify.FastifyRequest & UserContainer,
      Promise<ValueOrErrors<GameSetupsCreationQuery>>
    >,
  ) {}

  public async handle(
    request: fastify.FastifyRequest & UserContainer,
    reply: fastify.FastifyReply,
  ): Promise<void> {
    const gameSetupCreationQueryOrErrors: ValueOrErrors<GameSetupsCreationQuery> = await this.postGameSetupV1RequestToGameSetupsCreationQueryConverter.transform(
      request,
    );

    if (gameSetupCreationQueryOrErrors.isEither) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: gameSetupCreationQueryOrErrors.value.join('\n') });
    } else {
      const gameSetupCreationQuery: GameSetupsCreationQuery =
        gameSetupCreationQueryOrErrors.value;

      const [
        gameSetupCreated,
      ]: GameSetup[] = await this.createGameSetupsInteractor.interact(
        gameSetupCreationQuery,
      );

      const gameSetupApiV1Created: ExtendedGameSetupApiV1 = this.gameSetupToExtendedGameSetupApiV1Converter.transform(
        gameSetupCreated,
      );

      await reply.send(gameSetupApiV1Created);
    }
  }
}
