import { CardType } from '../../model/card/CardType';
import { BaseCardCreationQuery } from './BaseCardCreationQuery';

export interface ArtifactCreationQuery extends BaseCardCreationQuery {
  type: CardType.Artifact;
}
