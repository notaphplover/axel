import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { Battlefield } from '../../../../domain/model/live/Battlefield';
import { Graveyard } from '../../../../domain/model/live/Graveyard';
import { Library } from '../../../../domain/model/live/Library';
import { LiveGamePlayer } from '../../../../domain/model/live/LiveGamePlayer';
import { LiveGamePlayerArea } from '../../../../domain/model/live/LiveGamePlayerArea';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { BattlefieldApiV1 } from '../../model/live/BattlefieldApiV1';
import { GraveyardApiV1 } from '../../model/live/GraveyardApiV1';
import { LibraryApiV1 } from '../../model/live/LibraryApiV1';
import { LiveGamePlayerApiV1 } from '../../model/live/LiveGamePlayerApiV1';
import { LiveGamePlayerAreaApiV1 } from '../../model/live/LiveGamePlayerAreaApiV1';

@injectable()
export class LiveGamePlayerAreaToLiveGamePlayerAreaApiV1Converter
  implements Converter<LiveGamePlayerArea, LiveGamePlayerAreaApiV1>
{
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.live
        .BATTLEFIELD_TO_BATTLEFIELD_API_V1_CONVERTER,
    )
    private readonly battlefieldToBattlefieldApiV1Converter: Converter<
      Battlefield,
      BattlefieldApiV1
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.live
        .GRAVEYARD_TO_GRAVEYARD_API_V1_CONVERTER,
    )
    private readonly grageyardToGrageyardApiV1Converter: Converter<
      Graveyard,
      GraveyardApiV1
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.live.LIBRARY_TO_LIBRARY_API_V1_CONVERTER,
    )
    private readonly libraryToLibraryApiV1Converter: Converter<
      Library,
      LibraryApiV1
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.live
        .LIVE_GAME_PLAYER_TO_LIVE_GAME_PLAYER_API_V1_CONVERTER,
    )
    private readonly liveGamePlayerToLiveGamePlayerApiV1Converter: Converter<
      LiveGamePlayer,
      LiveGamePlayerApiV1
    >,
  ) {}

  public transform(
    liveGamePlayerArea: LiveGamePlayerArea,
  ): LiveGamePlayerAreaApiV1 {
    return {
      battlefield: this.battlefieldToBattlefieldApiV1Converter.transform(
        liveGamePlayerArea.battlefield,
      ),
      graveyard: this.grageyardToGrageyardApiV1Converter.transform(
        liveGamePlayerArea.graveyard,
      ),
      library: this.libraryToLibraryApiV1Converter.transform(
        liveGamePlayerArea.library,
      ),
      player: this.liveGamePlayerToLiveGamePlayerApiV1Converter.transform(
        liveGamePlayerArea.player,
      ),
    };
  }
}
