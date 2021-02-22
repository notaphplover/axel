import { PaginationQuery } from '../../../../../common/domain';
import { GameFormat } from '../../model/GameFormat';
import { GameSetupFindQueryPlayerSetup } from './GameSetupFindQueryPlayerSetup';

export interface GameSetupFindQuery extends PaginationQuery {
  format?: GameFormat;
  id?: string;
  ownerUserId?: string;
  playerSetups?: GameSetupFindQueryPlayerSetup[];
  playerSlots?: number;
}
