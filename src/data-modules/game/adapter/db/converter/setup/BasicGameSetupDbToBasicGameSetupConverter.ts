import { GameSetupDbToGameSetupConverter } from './GameSetupDbToGameSetupConverter';
import { PlayerReference } from '../../../../domain/model/setup/PlayerReference';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { injectable } from 'inversify';

@injectable()
export class BasicGameSetupDbToBasicGameSetupConverter extends GameSetupDbToGameSetupConverter<PlayerReference> {
  protected transformPlayerSetups(input: PlayerSetup[]): PlayerReference[] {
    const playerReferences: PlayerReference[] = [];

    for (const playerSetup of input) {
      playerReferences.push({
        userId: playerSetup.userId,
      });
    }

    return playerReferences;
  }
}
