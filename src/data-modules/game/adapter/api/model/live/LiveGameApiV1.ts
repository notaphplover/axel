import { GameFormatApiV1 } from '../GameFormatApiV1';
import { GameStateApiV1 } from './GameStateApiV1';
import { LiveGamePlayerAreaApiV1 } from './LiveGamePlayerAreaApiV1';

export interface LiveGameApiV1 {
  format: GameFormatApiV1;
  id: string;
  playerAreas: LiveGamePlayerAreaApiV1[];
  round: number;
  state: GameStateApiV1;
}
