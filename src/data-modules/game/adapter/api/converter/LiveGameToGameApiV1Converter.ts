import { Converter } from '../../../../../common/domain';
import { LiveGame } from '../../../domain/model/live/LiveGame';
import { LiveGameApiV1 } from '../model/live/LiveGameApiV1';
import { injectable } from 'inversify';

@injectable()
export class LiveGameToLiveGameApiV1Converter
  implements Converter<LiveGame, LiveGameApiV1> {
  public transform(input: LiveGame): LiveGameApiV1 {
    return {
      id: input.id,
      round: input.round,
    };
  }
}
