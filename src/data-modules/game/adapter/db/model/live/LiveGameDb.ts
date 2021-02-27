import { Document } from '../../../../../../integration-modules/mongodb/adapter';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { LiveGamePlayerArea } from '../../../../domain/model/live/LiveGamePlayerArea';

export interface LiveGameDb extends Document {
  format: GameFormat;
  playerAreas: LiveGamePlayerArea[];
  round: number;
}
