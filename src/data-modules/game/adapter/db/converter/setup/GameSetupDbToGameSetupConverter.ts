import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { GameSetupDb } from '../../model/setup/GameSetupDb';

@injectable()
export class GameSetupDbToGameSetupConverter
  implements Converter<GameSetupDb, GameSetup>
{
  public transform(input: GameSetupDb): GameSetup {
    return {
      format: input.format,
      id: input._id.toHexString(),
      ownerUserId: input.ownerUserId,
      playerSetups: this.transformPlayerSetups(input.playerSetups),
      playerSlots: input.playerSlots,
    };
  }

  protected transformPlayerSetups(input: PlayerSetup[]): PlayerSetup[] {
    const playerSetupsClone: PlayerSetup[] = [];

    for (const playerSetup of input) {
      playerSetupsClone.push({
        deckId: playerSetup.deckId,
        userId: playerSetup.userId,
      });
    }

    return playerSetupsClone;
  }
}
