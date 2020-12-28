import { Document } from '../../../../../../integration-modules/mongodb/adapter';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';

export interface GameSetupDb extends Document {
  format: GameFormat;
  ownerUserId: string;
  playerSetups: PlayerSetup[];
  playerSlots: number;
}
