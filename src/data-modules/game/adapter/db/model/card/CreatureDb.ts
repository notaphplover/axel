import { CardDb, cardDbModel } from './CardDb';
import { Model, Schema, SchemaDefinition } from 'mongoose';
import { CardType } from '../../../../domain/model/card/CardType';

export interface CreatureDb extends CardDb {
  type: CardType.Creature;
  power: number;
  toughness: number;
}

const creatureDbAdditionalPropertiesSchemaDefinition: SchemaDefinition = {
  power: { type: Number, required: true },
  toughness: { type: Number, required: true },
};

export const creatureDbSchema: Schema = new Schema(
  creatureDbAdditionalPropertiesSchemaDefinition,
);

export const creatureDbModel: Model<CreatureDb> = cardDbModel.discriminator<CreatureDb>(
  'Creature',
  creatureDbSchema,
  CardType.Creature,
);
