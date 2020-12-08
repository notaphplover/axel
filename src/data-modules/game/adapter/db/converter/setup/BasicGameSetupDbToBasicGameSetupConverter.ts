import { GameSetupDbToGameSetupConverter } from './GameSetupDbToGameSetupConverter';
import { PlayerReference } from '../../../../domain/model/setup/PlayerReference';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { injectable } from 'inversify';

@injectable()
export class BasicGameSetupDbToBasicGameSetupConverter extends GameSetupDbToGameSetupConverter<PlayerReference> {
  protected transformPlayerSetups(input: PlayerSetup[]): PlayerReference[] {
    return input.map((playerSetup: PlayerSetup) => {
      return {
        userId: playerSetup.userId,
      };
    });
  }
}
