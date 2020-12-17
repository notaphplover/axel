import { Schema, SchemaDefinition } from 'mongoose';
import { CardDeckSections } from '../../../../domain/model/deck/CardDeckSections';
import { Document } from '../../../../../../integration-modules/mongodb/adapter';
import { GameFormat } from '../../../../domain/model/GameFormat';

export interface CardDeckDb extends Document {
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
