import { GameFormat } from '../../model/GameFormat';
import { GameSetupFindQueryPlayerSetup } from './GameSetupFindQueryPlayerSetup';
import { PaginationQuery } from '../../../../../common/domain';

export interface GameSetupFindQuery extends PaginationQuery {
  format?: GameFormat;
  id?: string;
  ownerUserId?: string;
  playerSetups?: GameSetupFindQueryPlayerSetup[];
  playerSlots?: number;
}
