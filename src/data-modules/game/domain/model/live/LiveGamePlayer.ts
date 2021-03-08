import { Hand } from './Hand';

export interface LiveGamePlayer {
  hand: Hand;
  lives: number;
  targetId: string;
}
