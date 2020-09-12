import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface GameDb extends Document {
  _id: Types.ObjectId;
  round: number;
}

const gameDbSchema: Schema = new Schema({
  round: { type: Number, required: true },
});

export const gameDbModel: Model<GameDb> = mongoose.model<GameDb>(
  'Game',
  gameDbSchema,
  'game',
);
