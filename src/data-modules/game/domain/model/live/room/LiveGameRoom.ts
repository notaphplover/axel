import { Messenger } from '../../../../../../common/domain';

export interface LiveGameRoom {
  readonly liveGameId: string;

  readonly playerIdToPlayerGatewayMap: Map<string, Messenger>;
}
