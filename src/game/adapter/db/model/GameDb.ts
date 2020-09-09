import mongoose, { Document, Model, Schema } from 'mongoose';
import { NoIdGame } from '../../../domain/model/Game';

export interface GameDb extends NoIdGame, Document {}

const gameDbSchema: Schema = new Schema({
  round: { type: Number, required: true },
});

export const gameDbModel: Model<GameDb> = mongoose.model<GameDb>(
  'Game',
  gameDbSchema,
  'game',
);
