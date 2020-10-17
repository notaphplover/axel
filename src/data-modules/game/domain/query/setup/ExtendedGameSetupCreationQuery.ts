import { GameFormat } from '../../model/GameFormat';
import { PlayerSetup } from '../../model/setup/PlayerSetup';

export interface ExtendedGameSetupsCreationQuery {
  format: GameFormat;
  ownerUserId: string;
  playerSetups: PlayerSetup[];
  playerSlots: number;
}
