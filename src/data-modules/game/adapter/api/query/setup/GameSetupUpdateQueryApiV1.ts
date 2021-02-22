import { PlayerReferenceApiV1 } from '../../model/setup/PlayerReferenceApiV1';
import { GameSetupUpdateQueryAdditionalPlayerSetupApiV1 } from './GameSetupUpdateQueryPlayerSetupApiV1';

export interface GameSetupUpdateQueryApiV1 {
  id: string;

  additionalPlayerSetups?: GameSetupUpdateQueryAdditionalPlayerSetupApiV1[];

  removePlayerSetups?: PlayerReferenceApiV1[];
}
