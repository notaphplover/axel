import { Converter } from '../../../../../../common/domain';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { LiveGameDb } from '../../model/live/LiveGameDb';
import { injectable } from 'inversify';

@injectable()
export class GameDbToLiveGameConverter
  implements Converter<LiveGameDb, LiveGame> {
  public transform(input: LiveGameDb): LiveGame {
    return {
      id: input._id.toHexString(),
      round: input.round,
    };
  }
}
