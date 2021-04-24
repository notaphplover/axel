import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../../common/domain';
import { LiveGameConnectionsUpdateQuery } from '../../../../../domain/query/live/connection/LiveGameConnectionsUpdateQuery';
import { LiveGameConnectionsDb } from '../../../model/live/connection/LiveGameConnectionsDb';

@injectable()
export class LiveGameConnectionsUpdateQueryToLiveGameConnectionsDbUpdateQueryConverter
  implements
    Converter<
      LiveGameConnectionsUpdateQuery,
      mongodb.UpdateQuery<LiveGameConnectionsDb>
    > {
  public transform(
    liveGameConnectionsUpdateQuery: LiveGameConnectionsUpdateQuery,
  ): mongodb.UpdateQuery<LiveGameConnectionsDb> {
    const liveGameConnectionsDbUpdateQuery: unknown[] = [];

    liveGameConnectionsDbUpdateQuery.push({
      $project: {
        connections: {
          $filter: {
            input: '$connections',
            as: 'out',
            cond: {
              $not: {
                $in: [
                  '$$out.playerId',
                  [liveGameConnectionsUpdateQuery.liveGameConnection.playerId],
                ],
              },
            },
          },
        },
        liveGameId: true,
      },
    });

    liveGameConnectionsDbUpdateQuery.push({
      $addFields: {
        connections: {
          $concatArrays: [
            '$connections',
            [liveGameConnectionsUpdateQuery.liveGameConnection],
          ],
        },
      },
    });

    return (liveGameConnectionsDbUpdateQuery as unknown) as mongodb.UpdateQuery<LiveGameConnectionsDb>;
  }
}
