import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { GameFormatApiV1 } from '../../model/GameFormatApiV1';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { GameSetupFindQueryApiV1 } from '../../query/setup/GameSetupFindQueryApiV1';
import { GameSetupFindQueryPlayerSetup } from '../../../../domain/query/setup/GameSetupFindQueryPlayerSetup';
import { GameSetupFindQueryPlayerSetupApiV1 } from '../../query/setup/GameSetupFindQueryPlayerSetupApiV1';
import { hasValue } from '../../../../../../common/domain/utils/hasValue';

@injectable()
export class GameSetupFindQueryApiV1ToGameSetupFindQueryConverter
  implements Converter<GameSetupFindQueryApiV1, GameSetupFindQuery> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter
        .GAME_FORMAT_API_V1_TO_GAME_FORMAT_CONVERTER,
    )
    private readonly gameFormatApiV1ToGameFormatConverter: Converter<
      GameFormatApiV1,
      GameFormat
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_FIND_QUERY_PLAYER_SETUP_API_V1_TO_GAME_SETUP_FIND_QUERY_PLAYER_SETUP_CONVERTER,
    )
    private readonly gameSetupFindQueryPlayerSetupApiV1ToGameSetupFindQueryPlayerSetupConverter: Converter<
      GameSetupFindQueryPlayerSetupApiV1,
      GameSetupFindQueryPlayerSetup
    >,
  ) {}

  public transform(input: GameSetupFindQueryApiV1): GameSetupFindQuery {
    return {
      format: hasValue(input.format)
        ? this.gameFormatApiV1ToGameFormatConverter.transform(input.format)
        : undefined,
      id: input.id,
      limit: input.limit,
      offset: input.limit,
      ownerUserId: input.ownerUserId,
      playerSetups: input.playerSetups?.map(
        (playerSetupApiV1: GameSetupFindQueryPlayerSetupApiV1) => {
          return this.gameSetupFindQueryPlayerSetupApiV1ToGameSetupFindQueryPlayerSetupConverter.transform(
            playerSetupApiV1,
          );
        },
      ),
      playerSlots: input.playerSlots,
    };
  }
}
