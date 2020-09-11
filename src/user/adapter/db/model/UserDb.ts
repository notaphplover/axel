import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { NoIdUser } from '../../../domain/model/NoIdUser';

export interface UserDb extends NoIdUser, Document {
  _id: Types.ObjectId;

  hash: string;
  salt: string;
}

const userDbSchema: Schema = new Schema({
  round: { type: Number, required: true },
});

export const userDbModel: Model<UserDb> = mongoose.model<UserDb>(
  'User',
  userDbSchema,
  'user',
);
