import { GameFormat } from '../GameFormat';
import { PlayerSetup } from './PlayerSetup';

export interface GameSetup {
  format: GameFormat;
  id: string;
  playerSetups: PlayerSetup[];
  playerSlots: number;
}
