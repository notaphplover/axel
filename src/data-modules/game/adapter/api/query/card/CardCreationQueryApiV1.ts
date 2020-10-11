import { ArtifactCreationQueryApiV1 } from './ArtifactCreationQueryApiV1';
import { CreatureCreationQueryApiV1 } from './CreatureCreationQueryApiV1';
import { EnchantmentCreationQueryApiV1 } from './EnchantmentCreationQueryApiV1';
import { LandCreationQueryApiV1 } from './LandCreationQueryApiV1';

export type CardCreationQueryApiV1 =
  | ArtifactCreationQueryApiV1
  | CreatureCreationQueryApiV1
  | EnchantmentCreationQueryApiV1
  | LandCreationQueryApiV1;
