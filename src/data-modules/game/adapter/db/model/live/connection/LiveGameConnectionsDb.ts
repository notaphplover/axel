import { Document } from '../../../../../../../integration-modules/mongodb/adapter';
import { LiveGameConnection } from '../../../../../domain/model/live/connection/LiveGameConnection';

export interface LiveGameConnectionsDb extends Document {
  connections: LiveGameConnection[];
  liveGameId: string;
}
