import { Converter } from '../../../../../../common/domain';
import { GameCreationQuery } from '../../../../domain/query/GameCreationQuery';
import { LiveGameDb } from '../../model/live/LiveGameDb';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

@injectable()
export class GameCreationQueryToLiveGameDbsConverter
  implements Converter<GameCreationQuery, mongodb.OptionalId<LiveGameDb>[]> {
  public transform(query: GameCreationQuery): mongodb.OptionalId<LiveGameDb>[] {
    return [
      {
        round: query.round,
      },
    ];
  }
}
