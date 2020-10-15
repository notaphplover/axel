import { GameFormat } from '../../model/GameFormat';
import { PlayerSetup } from '../../model/setup/PlayerSetup';

export interface GameSetupCreationQuery {
  format: GameFormat;
  playerSetups: PlayerSetup[];
  playerSlots: number;
}
