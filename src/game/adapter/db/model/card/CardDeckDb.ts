import mongoose, {
  Document,
  Model,
  Schema,
  SchemaDefinition,
  Types,
} from 'mongoose';
import { CardDeckSections } from '../../../../domain/model/card/CardDeck';
import { GameFormat } from '../../../../domain/model/GameFormat';

export interface CardDeckDb extends Document {
  _id: Types.ObjectId;
  description: string;
  format: GameFormat;
  name: string;
  sections: CardDeckSections;
}

const cardSetReferencesDbSchemaDefinition: SchemaDefinition = {
  references: { type: Array, of: Schema.Types.ObjectId, required: true },
};

const cardDeckSectionsDbSchemaDefinition: SchemaDefinition = {
  core: { type: cardSetReferencesDbSchemaDefinition, required: true },
  sideboard: { type: cardSetReferencesDbSchemaDefinition, required: true },
};

export const cardDeckDbSchemaDefinition: SchemaDefinition = {
  sections: { type: cardDeckSectionsDbSchemaDefinition, required: true },
  description: { type: String, required: true },
  format: { type: String, required: true },
  name: { type: String, required: true },
};

export const cardDeckDbSchema: Schema = new Schema(cardDeckDbSchemaDefinition);

export const cardDeckDbModel: Model<CardDeckDb> = mongoose.model<CardDeckDb>(
  'CardDeck',
  cardDeckDbSchema,
  'CardDeck',
);
