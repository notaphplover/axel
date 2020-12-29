import { Converter } from '../../../../../../common/domain';
import { GameDb } from '../../model/GameDb';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { injectable } from 'inversify';

@injectable()
export class GameDbToLiveGameConverter implements Converter<GameDb, LiveGame> {
  public transform(input: GameDb): LiveGame {
    return {
      id: input._id.toHexString(),
      round: input.round,
    };
  }
}
