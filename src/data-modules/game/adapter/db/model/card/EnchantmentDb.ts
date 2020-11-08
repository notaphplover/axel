import { CardDb, cardDbModel } from './CardDb';
import { Model, Schema, SchemaDefinition } from 'mongoose';
import { CardType } from '../../../../domain/model/card/CardType';

export interface EnchantmentDb extends CardDb {
  type: CardType.Enchantment;
}

export const enchantmentDbAdditionalPropertiesSchemaDefinition: SchemaDefinition = {};

export const enchantmentDbSchema: Schema = new Schema(
  enchantmentDbAdditionalPropertiesSchemaDefinition,
);

export const enchantmentDbModel: Model<EnchantmentDb> = cardDbModel.discriminator<
  EnchantmentDb
>('Enchantment', enchantmentDbSchema, CardType.Enchantment);
