import { BaseCard } from './BaseCard';
import { CardType } from './CardType';

export interface Land extends BaseCard {
  type: CardType.Land;
}
