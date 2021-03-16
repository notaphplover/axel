import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../../common/domain';
import { LiveGameConnectionsCreationQuery } from '../../../../../domain/query/live/connection/LiveGameConnectionsCreationQuery';
import { LiveGameConnectionsDb } from '../../../model/live/connection/LiveGameConnectionsDb';

@injectable()
export class LiveGameConnectionsCreationQueryToLiveGameConnectionsConverter
  implements
    Converter<
      LiveGameConnectionsCreationQuery,
      mongodb.OptionalId<LiveGameConnectionsDb>[]
    > {
  public transform(
    liveGameConnectionsCreationQuery: LiveGameConnectionsCreationQuery,
  ): mongodb.OptionalId<LiveGameConnectionsDb>[] {
    return [
      {
        connections: [],
        liveGameId: liveGameConnectionsCreationQuery.liveGameId,
      },
    ];
  }
}
