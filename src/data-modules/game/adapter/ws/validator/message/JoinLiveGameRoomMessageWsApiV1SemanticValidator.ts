import { injectable } from 'inversify';

import { ValidationResult, Validator } from '../../../../../../common/domain';
import { LiveGamePlayerArea } from '../../../../domain/model/live/LiveGamePlayerArea';
import { UpsertLiveGameRoomQueryWsApiV1 } from '../../query/UpsertLiveGameRoomQueryWsApiV1';
import { JoinLiveGameRoomMessageWsApiV1ValidationContext } from './JoinLiveGameRoomMessageWsApiV1ValidationContext';

@injectable()
export class JoinLiveGameRoomMessageWsApiV1SemanticValidator
  implements
    Validator<
      UpsertLiveGameRoomQueryWsApiV1,
      UpsertLiveGameRoomQueryWsApiV1,
      JoinLiveGameRoomMessageWsApiV1ValidationContext
    > {
  public validate(
    upsertLiveGameRoomQueryWsApiV1: UpsertLiveGameRoomQueryWsApiV1,
    context: JoinLiveGameRoomMessageWsApiV1ValidationContext,
  ): ValidationResult<UpsertLiveGameRoomQueryWsApiV1> {
    const errorMessages: string[] = [];

    if (upsertLiveGameRoomQueryWsApiV1.liveGameId !== context.liveGame.id) {
      errorMessages.push(
        `Expected a game with id "${context.liveGame.id}", found "${upsertLiveGameRoomQueryWsApiV1.liveGameId}"`,
      );
    }

    if (
      !context.liveGame.playerAreas.some(
        (playerArea: LiveGamePlayerArea) =>
          playerArea.player.targetId ===
            upsertLiveGameRoomQueryWsApiV1.playerId &&
          playerArea.player.userId === context.user.id,
      )
    ) {
      errorMessages.push(
        `No player"${upsertLiveGameRoomQueryWsApiV1.playerId}" is owned by user "${context.user.id}" on game "${context.liveGame.id}"`,
      );
    }

    if (errorMessages.length === 0) {
      return {
        model: upsertLiveGameRoomQueryWsApiV1,
        result: true,
      };
    } else {
      const errorMessage: string = errorMessages.join('\n');

      return {
        errorMessage: errorMessage,
        result: false,
      };
    }
  }
}
