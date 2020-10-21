import { GameFormatApiV1 } from '../../model/GameFormatApiV1';
import { GameSetupCreationQueryPlayerSetupApiV1 } from './GameSetupCreationQueryPlayerSetupApiV1';

export interface GameSetupCreationQueryApiV1 {
  format: GameFormatApiV1;
  ownerUserId: string;
  playerSetups: GameSetupCreationQueryPlayerSetupApiV1[];
  playerSlots: number;
}
