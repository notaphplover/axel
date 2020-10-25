import { GameFormatApiV1 } from '../../model/GameFormatApiV1';
import { GameSetupFindQueryPlayerSetupApiV1 } from './GameSetupFindQueryPlayerSetupApiV1';
import { PaginationQueryApiV1 } from '../../../../../../layer-modules/api/adapter';

export interface GameSetupFindQueryApiV1 extends PaginationQueryApiV1 {
  format?: GameFormatApiV1;
  id?: string;
  ownerUserId?: string;
  playerSetups?: GameSetupFindQueryPlayerSetupApiV1[];
  playerSlots?: number;
}
