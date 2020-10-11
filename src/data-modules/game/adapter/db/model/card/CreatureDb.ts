import {
  CardDb,
  MONGO_DB_CARD_COLLECTION_NAME,
  cardDbBaseSchemaDefinition,
} from './CardDb';
import mongoose, { Model, Schema, SchemaDefinition } from 'mongoose';
import { CardType } from '../../../../domain/model/card/CardType';
import _ from 'lodash';

export interface CreatureDb extends CardDb {
  type: CardType.Creature;
  power: number;
  toughness: number;
}

export const creatureDbAdditionalPropertiesSchemaDefinition: SchemaDefinition = {
  power: { type: Number, required: true },
  toughness: { type: Number, required: true },
};

export const creatureDbSchemaDefinition: SchemaDefinition = _.merge<
  SchemaDefinition,
  Partial<SchemaDefinition>,
  Partial<SchemaDefinition>
>(
  {},
  cardDbBaseSchemaDefinition,
  creatureDbAdditionalPropertiesSchemaDefinition,
);

export const creatureDbSchema: Schema = new Schema(creatureDbSchemaDefinition);

export const creatureDbModel: Model<CreatureDb> = mongoose.model<CreatureDb>(
  'Creature',
  creatureDbSchema,
  MONGO_DB_CARD_COLLECTION_NAME,
);