import { LiveGameConnection } from './LiveGameConnection';

export interface LiveGameConnections {
  connections: LiveGameConnection[];
  id: string;
  liveGameId: string;
}
