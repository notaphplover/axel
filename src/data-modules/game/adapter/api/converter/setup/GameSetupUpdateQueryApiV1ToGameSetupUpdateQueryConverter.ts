import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { GameSetupUpdateQueryAdditionalPlayerSetupApiV1 } from '../../query/setup/GameSetupUpdateQueryPlayerSetupApiV1';
import { GameSetupUpdateQueryApiV1 } from '../../query/setup/GameSetupUpdateQueryApiV1';
import { PlayerReference } from '../../../../domain/model/setup/PlayerReference';
import { PlayerReferenceApiV1 } from '../../model/setup/PlayerReferenceApiV1';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';

@injectable()
export class GameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter
  implements
    Converter<GameSetupUpdateQueryApiV1, Promise<GameSetupUpdateQuery>> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_UPDATE_QUERY_ADDITIONAL_PLAYER_SETUP_API_V1_ARRAY_TO_PLAYER_SETUP_ARRAY_CONVERTER,
    )
    private readonly gameSetupUpdateQueryAdditionalPlayerSetupApiV1ArrayToPlayerSetupArrayConverter: Converter<
      GameSetupUpdateQueryAdditionalPlayerSetupApiV1[],
      Promise<PlayerSetup[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .PLAYER_REFERENCE_API_V1_TO_PLAYER_REFERENCE_CONVERTER,
    )
    private readonly playerReferenceApiV1ToPlayerReferenceConverter: Converter<
      PlayerReferenceApiV1,
      PlayerReference
    >,
  ) {}

  public async transform(
    input: GameSetupUpdateQueryApiV1,
  ): Promise<GameSetupUpdateQuery> {
    return {
      additionalPlayerSetups: await this.adaptAdditionalPlayerSetups(input),
      id: input.id,
      removePlayerSetups: this.adaptRemovePlayerSetups(input),
    };
  }

  private async adaptAdditionalPlayerSetups(
    input: GameSetupUpdateQueryApiV1,
  ): Promise<PlayerSetup[] | undefined> {
    let additionalPlayerSetups: PlayerSetup[] | undefined;

    if (input.additionalPlayerSetups === undefined) {
      additionalPlayerSetups = undefined;
    } else {
      additionalPlayerSetups = await this.gameSetupUpdateQueryAdditionalPlayerSetupApiV1ArrayToPlayerSetupArrayConverter.transform(
        input.additionalPlayerSetups,
      );
    }

    return additionalPlayerSetups;
  }

  private adaptRemovePlayerSetups(
    input: GameSetupUpdateQueryApiV1,
  ): PlayerReference[] | undefined {
    let removePlayerSetups: PlayerReferenceApiV1[] | undefined;

    if (input.removePlayerSetups === undefined) {
      removePlayerSetups = undefined;
    } else {
      removePlayerSetups = input.removePlayerSetups.map(
        (removePlayerSetup: PlayerReference) =>
          this.playerReferenceApiV1ToPlayerReferenceConverter.transform(
            removePlayerSetup,
          ),
      );
    }

    return removePlayerSetups;
  }
}
