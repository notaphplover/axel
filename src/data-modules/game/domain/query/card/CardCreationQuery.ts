import { ArtifactCreationQuery } from './ArtifactCreationQuery';
import { CreatureCreationQuery } from './CreatureCreationQuery';
import { EnchantmentCreationQuery } from './EnchantmentCreationQuery';
import { LandCreationQuery } from './LandCreationQuery';

export type CardCreationQuery =
  | ArtifactCreationQuery
  | CreatureCreationQuery
  | EnchantmentCreationQuery
  | LandCreationQuery;
