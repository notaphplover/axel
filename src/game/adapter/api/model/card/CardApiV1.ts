import { ArtifactApiV1 } from './ArtifactApiV1';
import { CreatureApiV1 } from './CreatureApiV1';
import { EnchantmentApiV1 } from './EnchantmentApiV1';
import { LandApiV1 } from './LandApiV1';

export type CardApiV1 =
  | ArtifactApiV1
  | CreatureApiV1
  | EnchantmentApiV1
  | LandApiV1;
