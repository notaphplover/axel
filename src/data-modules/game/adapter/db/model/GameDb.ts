import { Document } from '../../../../../integration-modules/mongodb/adapter';

export interface GameDb extends Document {
  round: number;
}
