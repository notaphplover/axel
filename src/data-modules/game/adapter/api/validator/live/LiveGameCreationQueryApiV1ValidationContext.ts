import { User } from '../../../../../user/domain';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';

export interface LiveGameCreationQueryApiV1ValidationContext {
  readonly gameSetup: GameSetup;
  readonly user: User;
}
