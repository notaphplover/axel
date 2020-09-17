import {
  CardDb,
  MONGO_DB_CARD_COLLECTION_NAME,
  cardDbSchemaDefinition,
} from './CardDb';
import mongoose, { Model, Schema, SchemaDefinition } from 'mongoose';
import { CardType } from '../../../../domain/model/card/CardType';
import _ from 'lodash';

export interface EnchantmentDb extends CardDb {
  type: CardType.Enchantment;
}

export const enchantmentDbSchemaDefinition: SchemaDefinition = _.merge(
  cardDbSchemaDefinition,
  {},
);

export const enchantmentDbSchema: Schema = new Schema(
  enchantmentDbSchemaDefinition,
);

export const enchantmentDbModel: Model<EnchantmentDb> = mongoose.model<
  EnchantmentDb
>('Enchantment', enchantmentDbSchema, MONGO_DB_CARD_COLLECTION_NAME);
