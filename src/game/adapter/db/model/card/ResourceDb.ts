import { Schema, SchemaDefinition } from 'mongoose';
import { ResourceType } from '../../../../domain/model/card/ResourceType';

export const resourceSchemaDefinition: SchemaDefinition = {
  [ResourceType.Black]: { type: Number, required: true },
  [ResourceType.Blue]: { type: Number, required: true },
  [ResourceType.Green]: { type: Number, required: true },
  [ResourceType.Red]: { type: Number, required: true },
  [ResourceType.Uncolored]: { type: Number, required: true },
  [ResourceType.White]: { type: Number, required: true },
};

export const resourceSchema: Schema = new Schema(resourceSchemaDefinition);
