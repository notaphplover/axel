import mongoose, { Model, Schema, SchemaDefinition } from 'mongoose';
import { GameDbCollectionName } from '../../GameDbCollection';
import { GameSetupDb } from './GameSetupDb';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { cardDeckDbSchemaDefinition } from '../deck/CardDeckDb';

export type ExtendedGameSetupDb = GameSetupDb<PlayerSetup>;

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

export const extendedGameSetupDbModel: Model<ExtendedGameSetupDb> = mongoose.model<ExtendedGameSetupDb>(
  'ExtendedGameSetup',
  extendedGameSetupDbSchema,
  GameDbCollectionName.ExtendedGameSetup,
);
