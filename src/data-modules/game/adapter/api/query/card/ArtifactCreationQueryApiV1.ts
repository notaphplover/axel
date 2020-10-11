import { BaseCardCreationQueryApiV1 } from './BaseCardCreationQueryApiV1';
import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';

export interface ArtifactCreationQueryApiV1 extends BaseCardCreationQueryApiV1 {
  type: CardTypeApiV1.Artifact;
}
