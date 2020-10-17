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

export interface ExtendedGameSetupDb extends Document {
  _id: Types.ObjectId;
  format: GameFormat;
  ownerUserId: string;
  playerSetups: PlayerSetup[];
  playerSlots: number;
}

const playerSetupDbSchemaDefinition: SchemaDefinition = {
  deck: { type: cardDeckDbSchemaDefinition, required: true },
  userId: { type: String, required: true },
};

const extendedGameSetupDbSchemaDefinition: SchemaDefinition = {
  format: { type: String, required: true },
  ownerUserId: { type: String, required: true, index: true },
  playerSetups: {
    type: Array,
    of: playerSetupDbSchemaDefinition,
    required: true,
  },
  playerSlots: { type: Number },
};

export const extendedGameSetupDbSchema: Schema = new Schema(
  extendedGameSetupDbSchemaDefinition,
);

extendedGameSetupDbSchema.index({ 'playerSetups.userId': 1 });

export const extendedGameSetupDbModel: Model<ExtendedGameSetupDb> = mongoose.model<
  ExtendedGameSetupDb
>('ExtendedGameSetup', extendedGameSetupDbSchema, 'extendedGameSetup');
