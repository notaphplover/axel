import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import {
  Converter,
  Interactor,
  ValueOrErrors,
} from '../../../../../../common/domain';
import { PostEntityRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { UserContainer } from '../../../../../user/domain';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { ExtendedGameSetupApiV1 } from '../../../api/model/setup/ExtendedGameSetupApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PostGameSetupV1RequestHandler extends PostEntityRequestHandler<
  GameSetup,
  ExtendedGameSetupApiV1,
  GameSetupsCreationQuery,
  fastify.FastifyRequest & UserContainer
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_TO_EXTENDED_GAME_SETUP_API_V1_CONVERTER,
    )
    gameSetupToExtendedGameSetupApiV1Converter: Converter<
      GameSetup,
      ExtendedGameSetupApiV1
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.setup.CREATE_GAME_SETUPS_INTERACTOR)
    createGameSetupsInteractor: Interactor<
      GameSetupsCreationQuery,
      Promise<GameSetup[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.server.converter.setup
        .POST_GAME_SETUP_V1_REQUEST_TO_GAME_SETUPS_CREATION_QUERY_CONVERTER,
    )
    postGameSetupV1RequestToGameSetupsCreationQueryConverter: Converter<
      fastify.FastifyRequest & UserContainer,
      Promise<ValueOrErrors<GameSetupsCreationQuery>>
    >,
  ) {
    super(
      gameSetupToExtendedGameSetupApiV1Converter,
      createGameSetupsInteractor,
      postGameSetupV1RequestToGameSetupsCreationQueryConverter,
    );
  }
}
