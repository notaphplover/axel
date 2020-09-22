import { BaseCard } from './BaseCard';
import { CardType } from './CardType';

export interface Artifact extends BaseCard {
  type: CardType.Artifact;
}
