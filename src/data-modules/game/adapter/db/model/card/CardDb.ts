import { Document } from '../../../../../../integration-modules/mongodb/adapter';
import { CardDetail } from '../../../../domain/model/card/CardDetail';
import { CardSubtype } from '../../../../domain/model/card/CardSubtype';
import { CardSupertype } from '../../../../domain/model/card/CardSupertype';
import { CardType } from '../../../../domain/model/card/CardType';
import { Resource } from '../../../../domain/model/card/Resource';

export interface CardDb extends Document {
  cost: Resource;
  detail: CardDetail;
  power?: number;
  subtypes: CardSubtype[];
  supertypes: CardSupertype[];
  toughness?: number;
  types: CardType[];
}
