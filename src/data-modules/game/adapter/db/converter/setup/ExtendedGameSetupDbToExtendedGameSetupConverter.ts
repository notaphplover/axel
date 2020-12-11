import { GameSetupDbToGameSetupConverter } from './GameSetupDbToGameSetupConverter';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { injectable } from 'inversify';

@injectable()
export class ExtendedGameSetupDbToExtendedGameSetupConverter extends GameSetupDbToGameSetupConverter<PlayerSetup> {
  protected transformPlayerSetups(input: PlayerSetup[]): PlayerSetup[] {
    const playerSetupsClone: PlayerSetup[] = [];

    for (const playerSetup of input) {
      playerSetupsClone.push({
        deck: playerSetup.deck,
        userId: playerSetup.userId,
      });
    }

    return playerSetupsClone;
  }
}
