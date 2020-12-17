import { CardDetail } from '../../../../domain/model/card/CardDetail';
import { CardType } from '../../../../domain/model/card/CardType';
import { Document } from '../../../../../../integration-modules/mongodb/adapter';
import { Resource } from '../../../../domain/model/card/Resource';

export interface CardDb extends Document {
  cost: Resource;
  detail: CardDetail;
  type: CardType;
}
