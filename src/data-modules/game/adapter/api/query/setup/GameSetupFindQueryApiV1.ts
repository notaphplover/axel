import { GameFormatApiV1 } from '../../model/GameFormatApiV1';
import { GameSetupFindQueryPlayerSetupApiV1 } from './GameSetupFindQueryPlayerSetupApiV1';

export interface GameSetupFindQueryApiV1 {
  format?: GameFormatApiV1;
  id?: string;
  ownerUserId?: string;
  playerSetups?: GameSetupFindQueryPlayerSetupApiV1[];
  playerSlots?: number;
}
