import {
  CardDb,
  MONGO_DB_CARD_COLLECTION_NAME,
  cardDbBaseSchemaDefinition,
} from './CardDb';
import mongoose, { Model, Schema, SchemaDefinition } from 'mongoose';
import { CardType } from '../../../../domain/model/card/CardType';
import _ from 'lodash';

export interface EnchantmentDb extends CardDb {
  type: CardType.Enchantment;
}

export const enchantmentDbAdditionalPropertiesSchemaDefinition: SchemaDefinition = {};

export const enchantmentDbSchemaDefinition: SchemaDefinition = _.merge<
  SchemaDefinition,
  Partial<SchemaDefinition>,
  Partial<SchemaDefinition>
>(
  {},
  cardDbBaseSchemaDefinition,
  enchantmentDbAdditionalPropertiesSchemaDefinition,
);

export const enchantmentDbSchema: Schema = new Schema(
  enchantmentDbSchemaDefinition,
);

export const enchantmentDbModel: Model<EnchantmentDb> = mongoose.model<
  EnchantmentDb
>('Enchantment', enchantmentDbSchema, MONGO_DB_CARD_COLLECTION_NAME);
