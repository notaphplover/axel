import { CardDb } from './CardDb';
import { CardType } from '../../../../domain/model/card/CardType';

export interface ArtifactDb extends CardDb {
  type: CardType.Artifact;
}
