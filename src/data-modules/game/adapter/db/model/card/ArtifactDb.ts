import {
  CardDb,
  MONGO_DB_CARD_COLLECTION_NAME,
  cardDbBaseSchemaDefinition,
} from './CardDb';
import mongoose, { Model, Schema, SchemaDefinition } from 'mongoose';
import { CardType } from '../../../../domain/model/card/CardType';
import _ from 'lodash';

export interface ArtifactDb extends CardDb {
  type: CardType.Artifact;
}

export const artifactDbAdditionalPropertiesSchemaDefinition: SchemaDefinition = {};

export const artifactDbSchemaDefinition: SchemaDefinition = _.merge<
  SchemaDefinition,
  Partial<SchemaDefinition>,
  Partial<SchemaDefinition>
>(
  {},
  cardDbBaseSchemaDefinition,
  artifactDbAdditionalPropertiesSchemaDefinition,
);

export const artifactDbSchema: Schema = new Schema(artifactDbSchemaDefinition);

export const artifactDbModel: Model<ArtifactDb> = mongoose.model<ArtifactDb>(
  'Artifact',
  artifactDbSchema,
  MONGO_DB_CARD_COLLECTION_NAME,
);
