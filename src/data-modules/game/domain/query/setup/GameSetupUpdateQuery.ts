import { PlayerSetup } from '../../model/setup/PlayerSetup';

export interface GameSetupUpdateQuery {
  id: string;

  additionalPlayerSetups?: PlayerSetup[];
}
