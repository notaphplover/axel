import mongodb from 'mongodb';

export interface MongoDbInitializer {
  initialize(mongoClient: mongodb.MongoClient): Promise<void>;
}
