import { Converter } from '../../../../../../common/domain';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { GameFormatApiV1 } from '../../model/GameFormatApiV1';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupApiV1 } from '../../model/setup/GameSetupApiV1';
import { injectable } from 'inversify';

@injectable()
export abstract class GameSetupToGameSetupApiV1Converter<TInput, TOutput>
  implements Converter<GameSetup<TInput>, GameSetupApiV1<TOutput>> {
  constructor(
    private readonly gameFormatToGameFormatApiV1Converter: Converter<
      GameFormat,
      GameFormatApiV1
    >,
  ) {}

  public transform(input: GameSetup<TInput>): GameSetupApiV1<TOutput> {
    const gameSetupApiV1: GameSetupApiV1<TOutput> = {
      format: this.gameFormatToGameFormatApiV1Converter.transform(input.format),
      id: input.id,
      ownerUserId: input.ownerUserId,
      playerSetups: input.playerSetups.map((inputPlayerSetup: TInput) =>
        this.transformInputPlayerSetupIntoOutputPlayerSetup(inputPlayerSetup),
      ),
      playerSlots: input.playerSlots,
    };

    return gameSetupApiV1;
  }

  protected abstract transformInputPlayerSetupIntoOutputPlayerSetup(
    inputPlayerSetup: TInput,
  ): TOutput;
}
