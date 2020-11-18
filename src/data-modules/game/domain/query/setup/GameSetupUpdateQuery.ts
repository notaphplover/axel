import { PlayerReference } from '../../model/setup/PlayerReference';
import { PlayerSetup } from '../../model/setup/PlayerSetup';

export interface GameSetupUpdateQuery {
  id: string;

  additionalPlayerSetups?: PlayerSetup[];

  removePlayerSetups?: PlayerReference[];
}
