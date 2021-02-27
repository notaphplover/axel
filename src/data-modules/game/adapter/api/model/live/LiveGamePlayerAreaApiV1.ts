import { BattlefieldApiV1 } from './BattlefieldApiV1';
import { GraveyardApiV1 } from './GraveyardApiV1';
import { LibraryApiV1 } from './LibraryApiV1';
import { LiveGamePlayerApiV1 } from './LiveGamePlayerApiV1';

export interface LiveGamePlayerAreaApiV1 {
  readonly battlefield: BattlefieldApiV1;
  readonly graveyard: GraveyardApiV1;
  readonly library: LibraryApiV1;
  readonly player: LiveGamePlayerApiV1;
}
