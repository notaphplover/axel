import { HandApiV1 } from './HandApiV1';

export interface LiveGamePlayerApiV1 {
  hand: HandApiV1;
  lives: number;
}
