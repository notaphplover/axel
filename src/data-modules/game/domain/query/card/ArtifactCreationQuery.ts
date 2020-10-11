import { BaseCardCreationQuery } from './BaseCardCreationQuery';
import { CardType } from '../../model/card/CardType';

export interface ArtifactCreationQuery extends BaseCardCreationQuery {
  type: CardType.Artifact;
}
