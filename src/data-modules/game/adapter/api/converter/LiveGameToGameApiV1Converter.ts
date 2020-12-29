import { Converter } from '../../../../../common/domain';
import { GameApiV1 } from '../model/GameApiV1';
import { LiveGame } from '../../../domain/model/live/LiveGame';
import { injectable } from 'inversify';

@injectable()
export class LiveGameToGameApiV1Converter
  implements Converter<LiveGame, GameApiV1> {
  public transform(input: LiveGame): GameApiV1 {
    return {
      id: input.id,
      round: input.round,
    };
  }
}
