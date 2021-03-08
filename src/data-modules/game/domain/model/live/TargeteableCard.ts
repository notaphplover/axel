import { Card } from '../card/Card';

export interface TargeteableCard {
  readonly card: Card;
  readonly targetId: string;
}
