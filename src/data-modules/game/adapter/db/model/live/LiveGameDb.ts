import { Document } from '../../../../../../integration-modules/mongodb/adapter';

export interface LiveGameDb extends Document {
  round: number;
}
