import { Resource } from '../card/Resource';
import { Hand } from './Hand';

export interface LiveGamePlayer {
  hand: Hand;
  lives: number;
  manaPool: Resource;
  targetId: string;
}
