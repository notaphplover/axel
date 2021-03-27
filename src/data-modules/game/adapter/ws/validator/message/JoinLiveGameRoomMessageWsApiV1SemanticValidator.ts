import { injectable } from 'inversify';

import { ValidationResult, Validator } from '../../../../../../common/domain';
import { JoinLiveGameRoomMessageWsApiV1 } from '../../message/JoinLiveGameRoomMessageWsApiV1';
import { JoinLiveGameRoomMessageWsApiV1ValidationContext } from './JoinLiveGameRoomMessageWsApiV1ValidationContext';

@injectable()
export class JoinLiveGameRoomMessageWsApiV1SemanticValidator
  implements
    Validator<
      JoinLiveGameRoomMessageWsApiV1,
      JoinLiveGameRoomMessageWsApiV1,
      JoinLiveGameRoomMessageWsApiV1ValidationContext
    > {
  public validate(
    joinLiveGameRoomMessageWsApiV1: JoinLiveGameRoomMessageWsApiV1,
    context: JoinLiveGameRoomMessageWsApiV1ValidationContext,
  ): ValidationResult<JoinLiveGameRoomMessageWsApiV1> {
    const errorMessages: string[] = [];

    if (joinLiveGameRoomMessageWsApiV1.liveGameId !== context.liveGame.id) {
      errorMessages.push(
        `Expected a game with id "${context.liveGame.id}", found "${joinLiveGameRoomMessageWsApiV1.liveGameId}"`,
      );
    }

    if (errorMessages.length === 0) {
      return {
        model: joinLiveGameRoomMessageWsApiV1,
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
