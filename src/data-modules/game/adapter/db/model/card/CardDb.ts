import mongoose, {
  Document,
  Model,
  Schema,
  SchemaDefinition,
  SchemaOptions,
  Types,
} from 'mongoose';
import { CardDetail } from '../../../../domain/model/card/CardDetail';
import { CardType } from '../../../../domain/model/card/CardType';
import { Resource } from '../../../../domain/model/card/Resource';
import { cardDetailSchemaDefinition } from './CardDetailDb';
import { resourceSchemaDefinition } from './ResourceDb';

export interface CardDb extends Document {
  _id: Types.ObjectId;
  cost: Resource;
  detail: CardDetail;
  type: CardType;
}

const cardDbBaseSchemaDefinition: SchemaDefinition = {
  cost: { type: resourceSchemaDefinition, required: true },
  detail: { type: cardDetailSchemaDefinition, required: true },
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
  'card',
);
