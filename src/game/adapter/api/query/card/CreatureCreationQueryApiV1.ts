import { BaseCardCreationQueryApiV1 } from './BaseCardCreationQueryApiV1';

export interface CreatureCreationQueryApiV1 extends BaseCardCreationQueryApiV1 {
  power: number;
  toughness: number;
}
