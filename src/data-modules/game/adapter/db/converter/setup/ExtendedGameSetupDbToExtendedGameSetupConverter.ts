import { GameSetupDbToGameSetupConverter } from './GameSetupDbToGameSetupConverter';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { injectable } from 'inversify';

@injectable()
export class ExtendedGameSetupDbToExtendedGameSetupConverter extends GameSetupDbToGameSetupConverter<PlayerSetup> {
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
