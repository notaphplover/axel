import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { LiveGameDb } from '../../model/live/LiveGameDb';

@injectable()
export class LiveGameDbToLiveGameConverter
  implements Converter<LiveGameDb, LiveGame> {
  public transform(input: LiveGameDb): LiveGame {
    return {
      format: input.format,
      id: input._id.toHexString(),
      playerAreas: input.playerAreas,
      round: input.round,
    };
  }
}
