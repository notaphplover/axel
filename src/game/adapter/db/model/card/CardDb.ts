import mongoose, {
  Document,
  Model,
  Schema,
  SchemaDefinition,
  SchemaOptions,
  Types,
} from 'mongoose';
import { CardType } from '../../../../domain/model/card/CardType';
import { Resource } from '../../../../domain/model/card/Resource';
import { resourceSchemaDefinition } from './ResourceDb';

export const MONGO_DB_CARD_COLLECTION_NAME: string = 'card';

export interface CardDb extends Document {
  _id: Types.ObjectId;
  cost: Resource;
  type: CardType;
}

export const cardDbBaseSchemaDefinition: SchemaDefinition = {
  cost: { type: resourceSchemaDefinition },
  type: { type: String, required: true },
};

const cardDbSchemaOptions: SchemaOptions = { discriminatorKey: 'type' };

export const cardDbSchema: Schema = new Schema(
  cardDbBaseSchemaDefinition,
  cardDbSchemaOptions,
);

export const cardDbModel: Model<CardDb> = mongoose.model<CardDb>(
  'Card',
  cardDbSchema,
  MONGO_DB_CARD_COLLECTION_NAME,
);
