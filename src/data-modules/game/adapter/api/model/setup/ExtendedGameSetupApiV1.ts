import { GameSetupApiV1 } from './GameSetupApiV1';
import { PlayerSetupApiV1 } from './PlayerSetupApiV1';

export type ExtendedGameSetupApiV1 = GameSetupApiV1<PlayerSetupApiV1>;
