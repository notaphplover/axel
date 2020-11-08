import { CardDb, cardDbModel } from './CardDb';
import { Model, Schema, SchemaDefinition } from 'mongoose';
import { CardType } from '../../../../domain/model/card/CardType';

export interface LandDb extends CardDb {
  type: CardType.Land;
}

const landDbAdditionalPropertiesSchemaDefinition: SchemaDefinition = {};

export const landDbSchema: Schema = new Schema(
  landDbAdditionalPropertiesSchemaDefinition,
);

export const landDbModel: Model<LandDb> = cardDbModel.discriminator<LandDb>(
  'Land',
  landDbSchema,
  CardType.Land,
);
