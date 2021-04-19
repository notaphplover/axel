import { LiveGameConnection } from '../../../model/live/connection/LiveGameConnection';

export interface LiveGameConnectionsUpdateQuery {
  liveGameId: string;
  liveGameConnection: LiveGameConnection;
}
