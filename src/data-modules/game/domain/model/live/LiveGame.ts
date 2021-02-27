import { GameFormat } from '../GameFormat';
import { LiveGamePlayerArea } from './LiveGamePlayerArea';

export interface LiveGame {
  format: GameFormat;
  id: string;
  playerAreas: LiveGamePlayerArea[];
  round: number;
}
