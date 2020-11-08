import { CardDb, cardDbModel } from './CardDb';
import { Model, Schema, SchemaDefinition } from 'mongoose';
import { CardType } from '../../../../domain/model/card/CardType';

export interface ArtifactDb extends CardDb {
  type: CardType.Artifact;
}

const artifactDbAdditionalPropertiesSchemaDefinition: SchemaDefinition = {};

export const artifactDbSchema: Schema = new Schema(
  artifactDbAdditionalPropertiesSchemaDefinition,
);

export const artifactDbModel: Model<ArtifactDb> = cardDbModel.discriminator<
  ArtifactDb
>('Artifact', artifactDbSchema, CardType.Artifact);
