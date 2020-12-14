import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { Artifact } from '../../../../domain/model/card/Artifact';
import { ArtifactCreationQuery } from '../../../../domain/query/card/ArtifactCreationQuery';
import { ArtifactDb } from '../../model/card/ArtifactDb';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { MongoDbInsertRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbInsertRepository';
import mongodb from 'mongodb';

@injectable()
export class ArtifactDbInsertRepository extends MongoDbInsertRepository<
  Artifact,
  ArtifactDb,
  ArtifactCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.card.CARD_COLLECTION_NAME)
    collectionName: string,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card.ARTIFACT_DB_TO_ARTIFACT_CONVERTER,
    )
    artifactDbToArtifactConverter: Converter<ArtifactDb, Artifact>,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
        .ARTIFACT_CREATION_QUERY_TO_ARTIFACT_DBS_CONVERTER,
    )
    artifactCreationQueryToArtifactDbsConverter: Converter<
      ArtifactCreationQuery,
      mongodb.OptionalId<ArtifactDb>[]
    >,
  ) {
    super(
      collectionName,
      artifactDbToArtifactConverter,
      mongoDbConnector,
      artifactCreationQueryToArtifactDbsConverter,
    );
  }
}
