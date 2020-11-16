import { GameSetupUpdateQueryPlayerSetupApiV1 } from './GameSetupUpdateQueryPlayerSetupApiV1';

export interface GameSetupUpdateQueryApiV1 {
  id: string;

  additionalPlayerSetups?: GameSetupUpdateQueryPlayerSetupApiV1[];
}
