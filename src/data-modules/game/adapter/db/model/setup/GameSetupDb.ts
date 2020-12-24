import { Document } from '../../../../../../integration-modules/mongodb/adapter';
import { GameFormat } from '../../../../domain/model/GameFormat';

export interface GameSetupDb<TPlayerSetup> extends Document {
  format: GameFormat;
  ownerUserId: string;
  playerSetups: TPlayerSetup[];
  playerSlots: number;
}
