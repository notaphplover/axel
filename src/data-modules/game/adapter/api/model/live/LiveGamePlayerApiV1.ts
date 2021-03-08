import { ResourceApiV1 } from '../card/ResourceApiV1';
import { HandApiV1 } from './HandApiV1';

export interface LiveGamePlayerApiV1 {
  hand: HandApiV1;
  lives: number;
  manaPool: ResourceApiV1;
  targetId: string;
}
