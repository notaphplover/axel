import { GameFormatApiV1 } from '../GameFormatApiV1';

export interface GameSetupApiV1<TPlayerSetup> {
  format: GameFormatApiV1;
  id: string;
  ownerUserId: string;
  playerSetups: TPlayerSetup[];
  playerSlots: number;
}
