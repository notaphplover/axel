import { injectable } from 'inversify';
import _ from 'lodash';

import { Converter } from '../../../../../../../common/domain';
import { LiveGameConnections } from '../../../../../domain/model/live/connection/LiveGameConnections';
import { LiveGameConnectionsDb } from '../../../model/live/connection/LiveGameConnectionsDb';

@injectable()
export class LiveGameConnectionsDbToLiveGameConnectionsConverter
  implements Converter<LiveGameConnectionsDb, LiveGameConnections>
{
  public transform(
    liveGameConnectionsDb: LiveGameConnectionsDb,
  ): LiveGameConnections {
    const liveGameConnections: LiveGameConnections = {
      connections: _.cloneDeep(liveGameConnectionsDb.connections),
      id: liveGameConnectionsDb._id.toHexString(),
      liveGameId: liveGameConnectionsDb.liveGameId,
    };

    return liveGameConnections;
  }
}
