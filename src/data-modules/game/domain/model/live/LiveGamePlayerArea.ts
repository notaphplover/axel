import { Battlefield } from './Battlefield';
import { Graveyard } from './Graveyard';
import { Library } from './Library';
import { LiveGamePlayer } from './LiveGamePlayer';

export interface LiveGamePlayerArea {
  readonly battlefield: Battlefield;
  readonly graveyard: Graveyard;
  readonly library: Library;
  readonly player: LiveGamePlayer;
}
