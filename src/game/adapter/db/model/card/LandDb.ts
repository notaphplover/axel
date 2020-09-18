import {
  CardDb,
  MONGO_DB_CARD_COLLECTION_NAME,
  cardDbBaseSchemaDefinition,
} from './CardDb';
import mongoose, { Model, Schema, SchemaDefinition } from 'mongoose';
import { CardType } from '../../../../domain/model/card/CardType';
import _ from 'lodash';

export interface LandDb extends CardDb {
  type: CardType.Land;
}

export const landDbAdditionalPropertiesSchemaDefinition: SchemaDefinition = {};

export const landDbSchemaDefinition: SchemaDefinition = _.merge<
  SchemaDefinition,
  Partial<SchemaDefinition>,
  Partial<SchemaDefinition>
>({}, cardDbBaseSchemaDefinition, landDbAdditionalPropertiesSchemaDefinition);

export const landDbSchema: Schema = new Schema(landDbSchemaDefinition);

export const landDbModel: Model<LandDb> = mongoose.model<LandDb>(
  'Land',
  landDbSchema,
  MONGO_DB_CARD_COLLECTION_NAME,
);
