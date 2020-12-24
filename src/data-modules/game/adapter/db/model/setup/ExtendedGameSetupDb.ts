import { GameSetupDb } from './GameSetupDb';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';

export type ExtendedGameSetupDb = GameSetupDb<PlayerSetup>;
