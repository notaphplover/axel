import { ExtendedGameSetupDbToGameSetupConverter } from './ExtendedGameSetupDbToGameSetupConverter';
import { PlayerReference } from '../../../../domain/model/setup/PlayerReference';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { injectable } from 'inversify';

@injectable()
export class ExtendedGameSetupDbToBasicGameSetupConverter extends ExtendedGameSetupDbToGameSetupConverter<
  PlayerReference
> {
  protected transformPlayerSetups(input: PlayerSetup[]): PlayerReference[] {
    return input.map((playerSetup: PlayerSetup) => {
      return {
        userId: playerSetup.userId,
      };
    });
  }
}
