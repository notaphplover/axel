import { CardDetail } from '../../../../domain/model/card/CardDetail';
import { CardType } from '../../../../domain/model/card/CardType';
import { Resource } from '../../../../domain/model/card/Resource';
import mongodb from 'mongodb';

export interface CardDb {
  _id: mongodb.ObjectID;
  cost: Resource;
  detail: CardDetail;
  type: CardType;
}
