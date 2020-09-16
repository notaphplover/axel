import { Card } from './Card';
import { CardType } from './CardType';

export interface Land extends Card {
  type: CardType.Land;
}
