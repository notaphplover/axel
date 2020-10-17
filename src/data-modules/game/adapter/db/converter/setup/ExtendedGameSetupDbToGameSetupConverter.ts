import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { injectable } from 'inversify';

@injectable()
export abstract class ExtendedGameSetupDbToGameSetupConverter<TPlayerSetup>
  implements Converter<ExtendedGameSetupDb, GameSetup<TPlayerSetup>> {
  public transform(input: ExtendedGameSetupDb): GameSetup<TPlayerSetup> {
    return {
      format: input.format,
      id: input._id.toHexString(),
      ownerUserId: input.ownerUserId,
      playerSetups: this.transformPlayerSetups(input.playerSetups),
      playerSlots: input.playerSlots,
    };
  }

  protected abstract transformPlayerSetups(
    input: PlayerSetup[],
  ): TPlayerSetup[];
}
