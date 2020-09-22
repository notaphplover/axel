import { CardType } from './CardType';
import { Resource } from './Resource';

export interface BaseCard {
  cost: Resource;
  id: string;
  type: CardType;
}
