import { inject, injectable } from 'inversify';
import { BasicGameSetup } from '../../model/setup/BasicGameSetup';
import { Converter } from '../../../../../common/domain';
import { ExtendedGameSetup } from '../../model/setup/ExtendedGameSetup';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { PlayerReference } from '../../model/setup/PlayerReference';
import { PlayerSetup } from '../../model/setup/PlayerSetup';

@injectable()
export class ExtendedGameSetupToBasicGameSetupConverter
  implements Converter<ExtendedGameSetup, BasicGameSetup> {
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.converter.setup
        .PLAYER_SETUP_TO_PLAYER_REFERENCE_CONVERTER,
    )
    private readonly playerSetupToPlayerReferenceConverter: Converter<
      PlayerSetup,
      PlayerReference
    >,
  ) {}

  public transform(input: ExtendedGameSetup): BasicGameSetup {
    return {
      format: input.format,
      id: input.id,
      ownerUserId: input.ownerUserId,
      playerSetups: input.playerSetups.map((playerSetup: PlayerSetup) =>
        this.playerSetupToPlayerReferenceConverter.transform(playerSetup),
      ),
      playerSlots: input.playerSlots,
    };
  }
}
