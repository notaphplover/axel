import { GameFormat } from '../../model/GameFormat';
import { PlayerSetup } from '../../model/setup/PlayerSetup';

export interface GameSetupsCreationQuery {
  format: GameFormat;
  ownerUserId: string;
  playerSetups: PlayerSetup[];
  playerSlots: number;
}
