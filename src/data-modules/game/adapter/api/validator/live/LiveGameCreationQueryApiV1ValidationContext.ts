import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { User } from '../../../../../user/domain';

export interface LiveGameCreationQueryApiV1ValidationContext {
  readonly gameSetup: GameSetup;
  readonly user: User;
}
