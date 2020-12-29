import { Battlefield } from './Battlefield';
import { Graveyard } from './Graveyard';
import { LiveGamePlayer } from './LiveGamePlayer';

export interface LiveGamePlayerArea {
  readonly battlefield: Battlefield;
  readonly graveyard: Graveyard;
  readonly player: LiveGamePlayer;
}
