import { Document, Types } from 'mongoose';
import { GameFormat } from '../../../../domain/model/GameFormat';

export interface GameSetupDb<TPlayerSetup> extends Document {
  _id: Types.ObjectId;
  format: GameFormat;
  ownerUserId: string;
  playerSetups: TPlayerSetup[];
  playerSlots: number;
}
