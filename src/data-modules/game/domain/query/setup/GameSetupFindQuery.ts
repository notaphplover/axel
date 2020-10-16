import { GameFormat } from '../../model/GameFormat';
import { GameSetupFindQueryPlayerSetup } from './GameSetupFindQueryPlayerSetup';

export interface GameSetupFindQuery {
  format?: GameFormat;
  id?: string;
  ownerUserId?: string;
  playerSetups?: GameSetupFindQueryPlayerSetup[];
  playerSlots?: number;
}
