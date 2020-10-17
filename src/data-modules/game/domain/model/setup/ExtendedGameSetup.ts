import { GameFormat } from '../GameFormat';
import { PlayerSetup } from './PlayerSetup';

export interface ExtendedGameSetup {
  format: GameFormat;
  id: string;
  ownerUserId: string;
  playerSetups: PlayerSetup[];
  playerSlots: number;
}
