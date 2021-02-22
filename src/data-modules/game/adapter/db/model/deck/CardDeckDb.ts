import { Document } from '../../../../../../integration-modules/mongodb/adapter';
import { CardDeckSections } from '../../../../domain/model/deck/CardDeckSections';
import { GameFormat } from '../../../../domain/model/GameFormat';

export interface CardDeckDb extends Document {
  description: string;
  format: GameFormat;
  name: string;
  sections: CardDeckSections;
}
