import { CardType } from '../../../../domain/model/card/CardType';
import { CardDb } from './CardDb';

export interface ArtifactDb extends CardDb {
  type: CardType.Artifact;
}
