import mongoose, {
  Document,
  Model,
  Schema,
  SchemaDefinition,
  Types,
} from 'mongoose';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { cardDeckDbSchemaDefinition } from '../deck/CardDeckDb';

export interface GameSetupDb extends Document {
  _id: Types.ObjectId;
  format: GameFormat;
  playerSetups: PlayerSetup[];
  playerSlots: number;
}

const playerSetupDbSchemaDefinition: SchemaDefinition = {
  deck: { type: cardDeckDbSchemaDefinition, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
};

const gameSetupDbSchemaDefinition: SchemaDefinition = {
  format: { type: String, required: true },
  playerSetups: {
    type: Array,
    of: playerSetupDbSchemaDefinition,
    required: true,
  },
  playerSlots: { type: Number },
};

export const gameSetupDbSchema: Schema = new Schema(
  gameSetupDbSchemaDefinition,
);

gameSetupDbSchema.index({ 'playerSetups.userId': 1 });

export const gameSetupDbModel: Model<GameSetupDb> = mongoose.model<GameSetupDb>(
  'GameSetup',
  gameSetupDbSchema,
  'gameSetup',
);
