import { Artifact } from './Artifact';
import { Creature } from './Creature';
import { Enchantment } from './Enchantment';
import { Land } from './Land';

export type Card = Artifact | Creature | Enchantment | Land;
