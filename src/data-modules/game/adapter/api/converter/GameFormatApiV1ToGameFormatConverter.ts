import { injectable } from 'inversify';

import { Converter } from '../../../../../common/domain';
import { GameFormat } from '../../../domain/model/GameFormat';
import { GameFormatApiV1 } from '../model/GameFormatApiV1';

const gameFormatApiV1ToGameFormatMap: {
  [TKey in GameFormatApiV1]: GameFormat;
} = {
  [GameFormatApiV1.ALPHA]: GameFormat.ALPHA,
  [GameFormatApiV1.UNRESTRICTED]: GameFormat.UNRESTRICTED,
};

@injectable()
export class GameFormatApiV1ToGameFormatConverter
  implements Converter<GameFormatApiV1, GameFormat>
{
  public transform(input: GameFormatApiV1): GameFormat {
    if (input in gameFormatApiV1ToGameFormatMap) {
      return gameFormatApiV1ToGameFormatMap[input];
    } else {
      throw new Error(`Unexpected game format api "${input}"`);
    }
  }
}
