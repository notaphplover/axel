import { Converter } from '../../../../../common/domain';
import { GameCreationQuery } from '../../../domain/query/GameCreationQuery';
import { GameDb } from '../model/GameDb';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

@injectable()
export class GameCreationQueryToGameDbsConverter
  implements Converter<GameCreationQuery, mongodb.OptionalId<GameDb>[]> {
  public transform(query: GameCreationQuery): mongodb.OptionalId<GameDb>[] {
    return [
      {
        round: query.round,
      } as mongodb.OptionalId<GameDb>,
    ];
  }
}
