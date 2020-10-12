import { Converter } from '../../../../../common/domain';
import { GameFormat } from '../../../domain/model/GameFormat';
import { GameFormatApiV1 } from '../model/GameFormatApiV1';
import { injectable } from 'inversify';

const gameFormatToGameFormatApiV1Map: {
  [TKey in GameFormat]: GameFormatApiV1;
} = {
  [GameFormat.UNRESTRICTED]: GameFormatApiV1.UNRESTRICTED,
};

injectable();
export class GameFormatToGameFormatApiV1Converter
  implements Converter<GameFormat, GameFormatApiV1> {
  public transform(input: GameFormat): GameFormatApiV1 {
    if (input in gameFormatToGameFormatApiV1Map) {
      return gameFormatToGameFormatApiV1Map[input];
    } else {
      throw new Error(`Unexpected game format "${input}"`);
    }
  }
}
