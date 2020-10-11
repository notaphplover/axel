import { Schema, SchemaDefinition } from 'mongoose';

export const cardDetailDefinition: SchemaDefinition = {
  description: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
};

export const cardDetailSchemaDefinition: Schema = new Schema(
  cardDetailDefinition,
);
