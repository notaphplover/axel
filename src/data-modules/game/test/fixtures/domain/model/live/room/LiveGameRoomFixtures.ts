import { Messenger } from '../../../../../../../../common/domain';
import { LiveGameRoom } from '../../../../../../domain/model/live/room/LiveGameRoom';

export class LiveGameRoomFixtures {
  public static any(): LiveGameRoom {
    const fixture: LiveGameRoom = {
      liveGameId: 'sample-live-game-id',
      playerIdToPlayerGatewayMap: new Map<string, Messenger>(),
    };

    return fixture;
  }

  public static withEmptyPlayerIdToPlayerGategayMap(
    liveGameId: string = 'sample-live-game-id',
  ): LiveGameRoom {
    const fixture: LiveGameRoom = {
      liveGameId: liveGameId,
      playerIdToPlayerGatewayMap: new Map<string, Messenger>(),
    };

    return fixture;
  }
}
