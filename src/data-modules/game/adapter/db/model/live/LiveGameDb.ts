import { Document } from '../../../../../../integration-modules/mongodb/adapter';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { GameState } from '../../../../domain/model/live/GameState';
import { LiveGamePlayerArea } from '../../../../domain/model/live/LiveGamePlayerArea';

export interface LiveGameDb extends Document {
  format: GameFormat;
  playerAreas: LiveGamePlayerArea[];
  round: number;
  state: GameState;
}
