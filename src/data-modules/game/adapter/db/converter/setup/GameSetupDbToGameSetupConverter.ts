import { Converter } from '../../../../../../common/domain';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupDb } from '../../model/setup/GameSetupDb';
import { injectable } from 'inversify';

@injectable()
export abstract class GameSetupDbToGameSetupConverter<TPlayerSetup>
  implements Converter<GameSetupDb<TPlayerSetup>, GameSetup<TPlayerSetup>> {
  public transform(input: GameSetupDb<TPlayerSetup>): GameSetup<TPlayerSetup> {
    return {
      format: input.format,
      id: input._id.toHexString(),
      ownerUserId: input.ownerUserId,
      playerSetups: this.transformPlayerSetups(input.playerSetups),
      playerSlots: input.playerSlots,
    };
  }

  protected abstract transformPlayerSetups(
    input: TPlayerSetup[],
  ): TPlayerSetup[];
}
