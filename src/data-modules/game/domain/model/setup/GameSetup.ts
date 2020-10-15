import { GameFormat } from '../GameFormat';
import { PlayerSetup } from './PlayerSetup';

export interface GameSetup {
  format: GameFormat;
  playerSetups: PlayerSetup[];
  playerSlots: number;
}
