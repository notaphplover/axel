import 'reflect-metadata';
import {
  ArtifactDb,
  artifactDbSchema,
} from '../../../../../adapter/db/model/card/ArtifactDb';
import mongoose, { Document, Model } from 'mongoose';
import { Artifact } from '../../../../../domain/model/card/Artifact';
import { ArtifactCreationQuery } from '../../../../../domain/query/card/ArtifactCreationQuery';
import { ArtifactDbInsertRepository } from '../../../../../adapter/db/repository/card/ArtifactDbInsertRepository';
import { Container } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { InsertRepository } from '../../../../../../layer-modules/db/domain';
import { artifactCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/fixtures';
import { artifactFixtureFactory } from '../../../../fixtures/domain/model/fixtures';
import { container } from '../../../../../../common/adapter/config/container';
import { dbTest } from '../../../../../../layer-modules/db/test';

const mongooseIntegrationDescribe: jest.Describe =
  dbTest.integration.utils.mongooseIntegrationDescribe;

async function clearCollection<T extends Document>(
  model: Model<T>,
): Promise<void> {
  await model.deleteMany({});
}

function createArtifactMongooseModelMock(alias: string): Model<ArtifactDb> {
  return mongoose.model<ArtifactDb>(alias, artifactDbSchema, alias);
}

function injectArtifactMongooseModelMock(
  container: Container,
  model: Model<ArtifactDb>,
): void {
  container
    .bind(GAME_ADAPTER_TYPES.db.model.card.ARTIFACT_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(ArtifactDbInsertRepository.name, () => {
  describe('.insert()', () => {
    describe('when called', () => {
      let artifactModelMock: Model<ArtifactDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'ArtifactDbInsertRepositoryModel';

        artifactModelMock = createArtifactMongooseModelMock(collectionName);

        await clearCollection(artifactModelMock);

        const childContainer: Container = container.createChild();
        injectArtifactMongooseModelMock(childContainer, artifactModelMock);

        const artifactDbInsertRepository: InsertRepository<
          Artifact,
          ArtifactCreationQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.card.ARTIFACT_INSERT_REPOSITORY,
        );

        result = await artifactDbInsertRepository.insert(
          artifactCreationQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(artifactModelMock);
      });

      it('must return the artifact created', () => {
        expect(result).toHaveProperty('length');
        expect((result as unknown[]).length).toBe(1);

        const [innerResult]: unknown[] = result as unknown[];

        expect((innerResult as Artifact).cost).toStrictEqual(
          artifactFixtureFactory.get().cost,
        );
        expect((innerResult as Artifact).type).toStrictEqual(
          artifactFixtureFactory.get().type,
        );
      });
    });
  });
});
