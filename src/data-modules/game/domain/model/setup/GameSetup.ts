import { GameFormat } from '../GameFormat';

export interface GameSetup<TPlayerSetup> {
  format: GameFormat;
  id: string;
  ownerUserId: string;
  playerSetups: TPlayerSetup[];
  playerSlots: number;
}
