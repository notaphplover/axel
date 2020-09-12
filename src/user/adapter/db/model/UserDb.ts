import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { UserRole } from '../../../domain/model/UserRole';

export interface UserDb extends Document {
  _id: Types.ObjectId;

  email: string;
  roles: UserRole[];
  username: string;
  hash: string;
}

const userDbSchema: Schema = new Schema({
  round: { type: Number, required: true },
});

export const userDbModel: Model<UserDb> = mongoose.model<UserDb>(
  'User',
  userDbSchema,
  'user',
);
