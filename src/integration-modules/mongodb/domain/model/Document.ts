import mongodb from 'mongodb';

export interface Document {
  _id: mongodb.ObjectID;
}
