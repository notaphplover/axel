import { CardType } from './CardType';
import { Resource } from './Resource';

export interface Card {
  cost: Resource;
  id: string;
  type: CardType;
}
