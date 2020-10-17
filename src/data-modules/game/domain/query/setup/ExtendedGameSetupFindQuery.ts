import { ExtendedGameSetupFindQueryPlayerSetup } from './ExtendedGameSetupFindQueryPlayerSetup';
import { GameFormat } from '../../model/GameFormat';

export interface ExtendedGameSetupFindQuery {
  format?: GameFormat;
  id?: string;
  ownerUserId?: string;
  playerSetups?: ExtendedGameSetupFindQueryPlayerSetup[];
  playerSlots?: number;
}
