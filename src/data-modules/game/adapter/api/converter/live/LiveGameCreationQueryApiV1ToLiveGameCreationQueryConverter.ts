import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { LiveGameCreationQuery } from '../../../../domain/query/live/LiveGameCreationQuery';
import { LiveGameCreationQueryApiV1 } from '../../query/live/LiveGameCreationQueryApiV1';
import { LiveGameCreationQueryApiV1ValidationContext } from '../../validator/live/LiveGameCreationQueryApiV1ValidationContext';

@injectable()
export class LiveGameCreationQueryApiV1ToLiveGameCreationQueryConverter
  implements
    Converter<
      LiveGameCreationQueryApiV1,
      LiveGameCreationQuery,
      LiveGameCreationQueryApiV1ValidationContext
    > {
  public transform(
    _liveGameCreationQueryApiV1: LiveGameCreationQueryApiV1,
    context: LiveGameCreationQueryApiV1ValidationContext,
  ): LiveGameCreationQuery {
    const liveGameCreationQuery: LiveGameCreationQuery = {
      gameSetup: context.gameSetup,
    };

    return liveGameCreationQuery;
  }
}
