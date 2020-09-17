import { CardCreationQuery } from './CardCreationQuery';
import { CardType } from '../../model/card/CardType';

export interface ArtifactCreationQuery extends CardCreationQuery {
  type: CardType.Artifact;
}
