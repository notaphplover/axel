import { Schema, SchemaDefinition } from 'mongoose';
import { ResourceType } from '../../../../domain/model/card/ResourceType';

export const resourceSchemaDefinition: SchemaDefinition = {
  [ResourceType.Black]: { type: Number },
};

export const resourceSchema: Schema = new Schema(resourceSchemaDefinition);
