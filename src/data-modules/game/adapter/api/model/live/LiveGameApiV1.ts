import { GameFormatApiV1 } from '../GameFormatApiV1';

export interface LiveGameApiV1 {
  format: GameFormatApiV1;
  id: string;
  round: number;
}
