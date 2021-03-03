import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { ArtifactDb } from '../../../../../adapter/db/model/card/ArtifactDb';
import { ArtifactDbInsertRepository } from '../../../../../adapter/db/repository/card/ArtifactDbInsertRepository';
import { Artifact } from '../../../../../domain/model/card/Artifact';
import { ArtifactCreationQuery } from '../../../../../domain/query/card/ArtifactCreationQuery';
import { artifactFixtureFactory } from '../../../../fixtures/domain/model/card';
import { artifactCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/card';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  ArtifactDbInsertRepository.name,
  () => {
    let collectionName: string;
    let artifactDbToArtifactConverter: Converter<ArtifactDb, Artifact>;
    let mongoDbConnector: MongoDbConnector;
    let artifactCreationQueryToArtifactDbsConverter: Converter<
      ArtifactCreationQuery,
      mongodb.OptionalId<ArtifactDb>[]
    >;

    let artifactDbInsertRepository: ArtifactDbInsertRepository;

    beforeAll(() => {
      collectionName = 'ArtifactDbInsertRepositoryIntegrationTests';

      artifactDbToArtifactConverter = {
        transform: jest.fn(),
      };

      mongoDbConnector = outputParam.elem as MongoDbConnector;

      artifactCreationQueryToArtifactDbsConverter = {
        transform: jest.fn(),
      };

      artifactDbInsertRepository = new ArtifactDbInsertRepository(
        collectionName,
        artifactDbToArtifactConverter,
        mongoDbConnector,
        artifactCreationQueryToArtifactDbsConverter,
      );
    });

    describe('.insert()', () => {
      describe('when called', () => {
        let artifactFixture: Artifact;

        let result: unknown;

        beforeAll(async () => {
          artifactFixture = artifactFixtureFactory.get();

          (artifactDbToArtifactConverter.transform as jest.Mock).mockReturnValueOnce(
            artifactFixture,
          );

          const artifactDbFixture: mongodb.OptionalId<ArtifactDb> = {
            cost: artifactFixture.cost,
            detail: artifactFixture.detail,
            type: artifactFixture.type,
            subtypes: [],
            supertypes: [],
          };

          (artifactCreationQueryToArtifactDbsConverter.transform as jest.Mock).mockReturnValueOnce(
            [artifactDbFixture],
          );

          result = await artifactDbInsertRepository.insert(
            artifactCreationQueryFixtureFactory.get(),
          );
        });

        afterAll(() => {
          (artifactDbToArtifactConverter.transform as jest.Mock).mockClear();
          (artifactCreationQueryToArtifactDbsConverter.transform as jest.Mock).mockClear();
        });

        it('must call artifactDbToArtifactConverter.transform with the db entity obtained', () => {
          const expectedArtifactDb: ArtifactDb = {
            _id: expect.any(mongodb.ObjectID) as mongodb.ObjectID,
            cost: artifactFixture.cost,
            detail: artifactFixture.detail,
            type: artifactFixture.type,
            subtypes: [],
            supertypes: [],
          };

          expect(artifactDbToArtifactConverter.transform).toHaveBeenCalledTimes(
            1,
          );
          expect(artifactDbToArtifactConverter.transform).toHaveBeenCalledWith(
            expectedArtifactDb,
          );
        });

        it('must return the artifact created', () => {
          expect(result).toStrictEqual([artifactFixture]);
        });
      });
    });
  },
);
