import { GameFormat } from '../GameFormat';
import { GameState } from './GameState';
import { LiveGamePlayerArea } from './LiveGamePlayerArea';

export interface LiveGame {
  format: GameFormat;
  id: string;
  playerAreas: LiveGamePlayerArea[];
  round: number;
  state: GameState;
}
