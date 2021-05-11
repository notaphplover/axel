import { injectable } from 'inversify';

import { ValidationResult, Validator } from '../../../../../../common/domain';
import { LiveGamePlayerArea } from '../../../../domain/model/live/LiveGamePlayerArea';
import { LiveGameRoomUpsertQueryWsApiV1 } from '../../query/LiveGameRoomUpsertQueryWsApiV1';
import { LiveGameRoomUpsertQueryWsApiV1ValidationContext } from './LiveGameRoomUpsertQueryWsApiV1ValidationContext';

@injectable()
export class LiveGameRoomUpsertQueryWsApiV1SemanticValidator
  implements
    Validator<
      LiveGameRoomUpsertQueryWsApiV1,
      LiveGameRoomUpsertQueryWsApiV1,
      LiveGameRoomUpsertQueryWsApiV1ValidationContext
    >
{
  public validate(
    liveGameRoomUpsertQueryWsApiV1: LiveGameRoomUpsertQueryWsApiV1,
    context: LiveGameRoomUpsertQueryWsApiV1ValidationContext,
  ): ValidationResult<LiveGameRoomUpsertQueryWsApiV1> {
    const errorMessages: string[] = [];

    if (liveGameRoomUpsertQueryWsApiV1.liveGameId !== context.liveGame.id) {
      errorMessages.push(
        `Expected a game with id "${context.liveGame.id}", found "${liveGameRoomUpsertQueryWsApiV1.liveGameId}"`,
      );
    }

    if (
      !context.liveGame.playerAreas.some(
        (playerArea: LiveGamePlayerArea) =>
          playerArea.player.targetId ===
            liveGameRoomUpsertQueryWsApiV1.playerId &&
          playerArea.player.userId === context.user.id,
      )
    ) {
      errorMessages.push(
        `No player"${liveGameRoomUpsertQueryWsApiV1.playerId}" is owned by user "${context.user.id}" on game "${context.liveGame.id}"`,
      );
    }

    if (errorMessages.length === 0) {
      return {
        model: liveGameRoomUpsertQueryWsApiV1,
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
