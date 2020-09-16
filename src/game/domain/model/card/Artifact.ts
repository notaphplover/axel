import { Card } from './Card';
import { CardType } from './CardType';

export interface Artifact extends Card {
  type: CardType.Artifact;
}
