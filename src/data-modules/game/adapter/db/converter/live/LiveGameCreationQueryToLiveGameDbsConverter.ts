import { Converter } from '../../../../../../common/domain';
import { LiveGameCreationQuery } from '../../../../domain/query/live/LiveGameCreationQuery';
import { LiveGameDb } from '../../model/live/LiveGameDb';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

@injectable()
export class LiveGameCreationQueryToLiveGameDbsConverter
  implements
    Converter<LiveGameCreationQuery, mongodb.OptionalId<LiveGameDb>[]> {
  public transform(
    query: LiveGameCreationQuery,
  ): mongodb.OptionalId<LiveGameDb>[] {
    return [
      {
        round: query.round,
      },
    ];
  }
}
