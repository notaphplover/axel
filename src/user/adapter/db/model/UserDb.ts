import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { UserRole } from '../../../domain/model/UserRole';

export interface UserDb extends Document {
  _id: Types.ObjectId;

  email: string;
  hash: string;
  roles: UserRole[];
  username: string;
}

const userDbSchema: Schema = new Schema({
  email: { type: String, required: true },
  hash: { type: String, required: true },
  roles: { type: Array, of: String, required: true },
  username: { type: String, required: true },
});

export const userDbModel: Model<UserDb> = mongoose.model<UserDb>(
  'User',
  userDbSchema,
  'user',
);
