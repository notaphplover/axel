import { CardApiV1 } from '../card/CardApiV1';

export interface TargeteableCardApiV1 {
  readonly card: CardApiV1;
  readonly targetId: string;
}
