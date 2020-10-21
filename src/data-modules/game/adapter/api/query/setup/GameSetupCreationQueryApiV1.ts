import { GameFormatApiV1 } from '../../model/GameFormatApiV1';
import { PlayerSetupApiV1 } from '../../model/setup/PlayerSetupApiV1';

export interface GameSetupCreationQueryApiV1 {
  format: GameFormatApiV1;
  ownerUserId: string;
  playerSetups: PlayerSetupApiV1[];
  playerSlots: number;
}
